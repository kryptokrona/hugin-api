'use strict'

require('dotenv').config()

var createError = require('http-errors')
var express = require('express')
var session = require('express-session')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var log = require('loglevel')
var bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

var postRouter = require('./routes/postRouter')
var hashtagRouter = require('./routes/hashtagRouter')

var huginSyncer = require('./configs/huginSyncer')

const {WebSocket, WebSocketServer} = require('ws');

const { getTimestamp, sleep } = require('./utils/time')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.locals.sitetitle = 'Hugin Cache'

// set cache control middleware
let setCache = function (req, res, next) {
    // period in seconds, currently 5 minutes
    // set this lower if we need to have more frequent update
    const period = 10

    // cache only for GET requests
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${period}`)
    } else if (req.hostname == 'kryptokrona.org') {
        res.set('Cache-control', `no-store`)
    } else {
        // for the other requests set strict no caching parameters
        res.set('Cache-control', `no-store`)
    }

    next()
}

app.use(setCache)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes) - TODO: perhaps put this in a settings.ini file?
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
// if problem with reverse proxy try tweak this setting (https://www.npmjs.com/package/express-rate-limit)
app.set('trust proxy', 1) 

// api routes
app.use(`${process.env.API_BASE_PATH}/`, postRouter)
app.use(`${process.env.API_BASE_PATH}/`, hashtagRouter)

app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // 404 Not Found.
    if (err.status === 404) {
        log.error(getTimestamp() + ' ERROR: 404 - Page could not be found.')
        return res
            .status(404).json('ERROR: Not Found.')
    }

    // 500 Internal Server Error (in production, all other errors send this response).
    if (req.app.get('env') !== 'development') {
        log.error(getTimestamp() + ' ERROR: 500 - Internal server error.')
        return res
            .status(500)
            .json('ERROR: Not Found.')
    }

    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // send response back
    res.status(err.status || 500)
})

// Start listening.
const server = app.listen(3000, async () => {
    console.log('Server started on http://localhost:3000')
    console.log('Press Ctrl-C to terminate...')

    if (process.env.NODE_ENV === 'development') {
        log.setLevel('trace')
    }

    // do not start the hugin syncer if we want to test the endpoints
    if (process.env.NODE_ENV !== 'test') {
        // starting hugin sync
        while (true) {
            await sleep(2000) //TODO: perhaps have a setting for this?
            await huginSyncer.backgroundSyncMessages()
        }
    }
})

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {

    // broadcasting to all listening clients
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
      
      ws.send('Connected to Hugin Cache Websocket! :)');
})
console.log("The WebSocket server is running on port 8080");

module.exports = wss