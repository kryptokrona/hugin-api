/**
 * Rate Limit configuration.
 */

'use strict'

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: Number(process.env.SYS_RATELIMIT_WINDOW_MS), // 15 minutes
  max: Number(process.env.SYS_RATELIMIT_MAX), // Limit each IP to 1000 requests per `window` (here, per 15 minutes) - TODO: perhaps put this in a settings.ini file?
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default limiter;
