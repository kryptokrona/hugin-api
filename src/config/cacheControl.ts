/**
 * Cache Control middleware configuration.
 */

'use strict'

import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config({ path: __dirname+'/.env' });

const setCache = (req: Request, res: Response, next: NextFunction) => {
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

export default setCache;
