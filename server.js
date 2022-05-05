'use strict'

require('dotenv').config()

var createError = require('http-errors')
var express = require('express')
var session = require('express-session')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var log = require('loglevel')

var postRouter = require('./routes/postRouter')
var hashtagRouter = require('./routes/hashtagRouter')

var huginSyncer = require('./configs/huginSyncer')

const { getTimestamp, sleep } = require('./utils/time')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.locals.sitetitle = 'Hugin Cache'

// setup and use session middleware (https://github.com/expressjs/session)
const sessionOptions = {
    name: 'boss', // Don't use default session cookie name.
    secret: 'boss cat', // Change it!!! The secret is used to hash the session with HMAC.
    resave: false, // Resave even if a request is not changing the session.
    saveUninitialized: false, // Don't save a created but not modified session.
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}

app.use(session(sessionOptions))

// middleware to be executed before the routes
app.use((req, res, next) => {
    // flash messages - survives only a round trip
    if (req.session.flash) {
        res.locals.flash = req.session.flash
        delete req.session.flash
    }

    if (req.session.username) {
        res.locals.username = req.session.username
    }

    next()
})

// api routes
app.use(`${process.env.API_BASE_PATH}/`, postRouter)
app.use(`${process.env.API_BASE_PATH}/`, hashtagRouter)

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
    res.status(err.status || 500).json('ERROR: Not Found.')
})

// Start listening.
app.listen(3000, async () => {
    console.log('Server started on http://localhost:3000')
    console.log('Press Ctrl-C to terminate...')

    if (process.env.NODE_ENV === 'development') {
        log.setLevel('trace')
    }

    // starting hugin sync
    while (true) {
        await sleep(2000)
        await huginSyncer.backgroundSyncMessages()
    }
})

module.exports = app