// Copyright (c) 2022-2023, The Kryptokrona Project
//
// Created by Marcus Cvjeticanin
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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
const WB = require('kryptokrona-wallet-backend-js');
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const files = require('fs/promises');

// latest routers
var postEncryptedRouterLatest = require('./routes/latest/postEncryptedRouter')
var postEncryptedGroupRouterLatest = require('./routes/latest/postEncryptedGroupRouter')
var infoRouterLatest = require('./routes/latest/infoRouter')

// syncers
var huginSyncer = require('./syncers/huginSyncer')

// utils
const { getTimestamp, sleep } = require('./utils/time')
const { openWallet, optimizeMessages, saveWallet } = require('./utils/wallet')

// configs
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
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedGroupRouterLatest)
app.use(`${process.env.API_BASE_PATH}/v1/`, infoRouterLatest)

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
    console.log(`🖥️ Server started on http://localhost:${process.env.SYS_API_PORT}`)
    console.log('🛑 Press Ctrl-C to terminate...')

    if (process.env.NODE_ENV === 'development') {
        log.setLevel('trace')
    }

    // do not start the hugin syncer if we want to test the endpoints
    if (process.env.NODE_ENV !== 'test') {

        // initializing daemon and wallet
        const daemon = new WB.Daemon('pool.kryptokrona.se', 11898)
        global.wallet = await openWallet(daemon)
        await wallet.start()
        console.log('👛 Started wallet.')
        console.log('📃 Address: ' + wallet.getPrimaryAddress())

        saveWallet(wallet)

        wallet.on('transaction', async () => {
            optimizeMessages(wallet)
        })

        // starting hugin sync
        while (true) {
            await sleep(process.env.SYS_HUGIN_SYNCER_SLEEP)
            await huginSyncer.backgroundSyncMessages()
            let [unlockedBalance, lockedBalance] = await wallet.getBalance();

            console.log('🔓 Unlocked Balance (XKR): ' + (unlockedBalance / 100000))
            console.log('🔒 Locked Balance (XKR): '   + (lockedBalance / 100000))
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
