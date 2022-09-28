/**
 * Cache Control middleware configuration.
 */

'use strict'

require('dotenv').config()

const setCache = (req, res, next) => {
  // period in seconds, currently 5 minutes
  // set this lower if we need to have more frequent update
  const period = 10

  // cache only for GET requests
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
  } else if (req.hostname === 'kryptokrona.org') {
    res.set('Cache-control', `no-store`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`)
  }

  next()
}

module  .exports = { setCache }
