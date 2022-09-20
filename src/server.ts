'use strict'

require('dotenv').config()

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var log = require('loglevel')
var bodyParser = require('body-parser')

const { WebSocket, WebSocketServer } = require('ws')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// latest routers
var postRouterLatest = require('./routes/latest/postRouter')
var postEncryptedRouterLatest = require('./routes/latest/postEncryptedRouter')
var postEncryptedGroupRouterLatest = require('./routes/latest/postEncryptedGroupRouter')
var hashtagRouterLatest = require('./routes/latest/hashtagRouter')
var statisticsRouterLatest = require('./routes/latest/statisticsRouter')

// v1 routers
var postRouter = require('./routes/v1/postRouter')
var postEncryptedRouter = require('./routes/v1/postEncryptedRouter')
var hashtagRouter = require('./routes/v1/hashtagRouter')

// syncers
var huginSyncer = require('./syncers/huginSyncer')

const { getTimestamp, sleep } = require('./utils/time')
const { swaggerOptions, swaggerCustomOptions } = require('./configs/swagger')
const { setCache } = require('./configs/cacheControl')
const { limiter } = require('./configs/rateLimit')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'));

app.locals.sitetitle = 'Hugin API'

// swagger
const openapiSpecification = swaggerJsdoc(swaggerOptions)

// cache control middleware
app.use(setCache)

// Apply the rate limiting middleware to all requests
app.use(limiter)
// if problem with reverse proxy try tweak this setting (https://www.npmjs.com/package/express-rate-limit)
app.set('trust proxy', 1)

// api routes
app.use(`${process.env.API_BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerCustomOptions))

// latest routes
app.use(`${process.env.API_BASE_PATH}/v1/`, postRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedGroupRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, hashtagRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, statisticsRouterLatest)

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
app.listen(process.env.SYS_API_PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.SYS_API_PORT}`)
    console.log('Press Ctrl-C to terminate...')

    if (process.env.NODE_ENV === 'development') {
        log.setLevel('trace')
    }

    // do not start the hugin syncer if we want to test the endpoints
    if (process.env.NODE_ENV !== 'test') {
        // starting hugin sync
        while (true) {
            await sleep(process.env.SYS_HUGIN_SYNCER_SLEEP)
            await huginSyncer.backgroundSyncMessages()
        }
    }
})

const wss = new WebSocketServer({ port: process.env.SYS_WS_PORT })

wss.on('connection', function connection(ws) {
    // broadcasting to all listening clients
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
})
console.log(`The WebSocket server is running on port ${process.env.SYS_WS_PORT}`);

module.exports = app
