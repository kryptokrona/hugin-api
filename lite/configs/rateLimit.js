/**
 * Rate Limit configuration.
 */

'use strict'

require('dotenv').config()
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
  windowMs: process.env.SYS_RATELIMIT_WINDOW_MS, // 15 minutes
  max: process.env.SYS_RATELIMIT_MAX, // Limit each IP to 1000 requests per `window` (here, per 15 minutes) - TODO: perhaps put this in a settings.ini file?
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = { limiter }
