'use strict'

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import createError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import log from "loglevel";
import bodyParser from "body-parser";

import { WebSocket, WebSocketServer } from "ws";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// latest routes
import postRouterLatest from "./route/latest/postRouter";
import postEncryptedRouterLatest from "./route/latest/postEncryptedRouter";
import postEncryptedGroupRouterLatest from "./route/latest/postEncryptedGroupRouter";
import hashtagRouterLatest from "./route/latest/hashtagRouter";
import statisticsRouterLatest from "./route/latest/statisticsRouter";

// syncers
import backgroundSyncMessages from "./syncer/huginSyncer";

// utils
import { getTimestamp, sleep } from "./util/time";

// configs
let { swaggerOptions, swaggerCustomOptions } = require("./config/swagger");
import setCache from "./config/cacheControl";
import limiter from "./config/rateLimit";

var app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

app.locals.sitetitle = 'Hugin API';

// swagger
const openapiSpecification = swaggerJsDoc(swaggerOptions);

// cache control middleware
app.use(setCache);

// Apply the rate limiting middleware to all requests
app.use(limiter);
// if problem with reverse proxy try tweak this setting (https://www.npmjs.com/package/express-rate-limit)
app.set('trust proxy', 1);

// api routes
app.use(`${process.env.API_BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerCustomOptions));

// latest routes
app.use(`${process.env.API_BASE_PATH}/v1/`, postRouterLatest);
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedRouterLatest);
app.use(`${process.env.API_BASE_PATH}/v1/`, postEncryptedGroupRouterLatest);
app.use(`${process.env.API_BASE_PATH}/v1/`, hashtagRouterLatest);
app.use(`${process.env.API_BASE_PATH}/v1/`, statisticsRouterLatest);

app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // 404 Not Found.
    if (err.status === 404) {
        log.error(getTimestamp() + ' ERROR: 404 - Page could not be found.');
        return res
            .status(404).json('ERROR: Not Found.');
    }

    // 500 Internal Server Error (in production, all other errors send this response).
    if (req.app.get('env') !== 'development') {
        log.error(getTimestamp() + ' ERROR: 500 - Internal server error.');
        return res
            .status(500)
            .json('ERROR: Not Found.');
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send response back
    res.status(err.status || 500);
})

// Start listening.
app.listen(process.env.SYS_API_PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.SYS_API_PORT}`);
    console.log('Press Ctrl-C to terminate...');

    if (process.env.NODE_ENV === 'development') {
        log.setLevel('trace');
    }

    // do not start the hugin syncer if we want to test the endpoints
    if (process.env.NODE_ENV !== 'test') {
        // starting hugin sync
        while (true) {
            await sleep(Number(process.env.SYS_HUGIN_SYNCER_SLEEP));
            await backgroundSyncMessages();
        }
    }
})

const wss = new WebSocketServer({ port: Number(process.env.SYS_WS_PORT) })

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

export {
    app
};
