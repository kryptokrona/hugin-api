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

//s routers
var postRouterLatest = require('./routes/postRouter')
var postEncryptedRouterLatest = require('./routes/postEncryptedRouter')
var postEncryptedGroupRouterLatest = require('./routes/postEncryptedGroupRouter')

// syncers
var huginSyncer = require('./syncers/huginSyncer')

const { getTimestamp, sleep } = require('./utils/time')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'));

// routes
app.use(postRouterLatest)
app.use(postEncryptedRouterLatest)
app.use(postEncryptedGroupRouterLatest)

app.use(bodyParser.json());

app.use(function (req, res, next) {
    next(createError(404))
})

app.use(function (err, req, res, next) {
    if (err.status === 404) {
        log.error(getTimestamp() + ' ERROR: 404 - Page could not be found.')
        return res
            .status(404).json('ERROR: Not Found.')
    }
    if (req.app.get('env') !== 'development') {
        log.error(getTimestamp() + ' ERROR: 500 - Internal server error.')
        return res
            .status(500)
            .json('ERROR: Not Found.')
    }

    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
})

// Start listening.
app.listen(process.env.SYS_API_PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.SYS_API_PORT}`)
    console.log('Press Ctrl-C to terminate...')

    while (true) {
        await sleep(process.env.SYS_HUGIN_SYNCER_SLEEP)
        await huginSyncer.backgroundSyncMessages()
    }
})

const wss = new WebSocketServer({ port: process.env.SYS_WS_PORT })

wss.on('connection', function connection(ws) {
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
