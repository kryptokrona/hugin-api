/**
 * Statistics Controller
 */

'use strict'

import log from "loglevel";
import { Request, Response } from "express";

import { getPostByTxHashStr, getPopularPosts, getPopularBoards } from "../../service/postService";
import { getTimestamp, convertUnixToDateTime, convertDateTimeToUnix } from "../../util/time";
import { getPagination, getPagingData } from "../../util/pagination";

/**
 * Get most popular posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getPopularBoardPosts(req: Request, res: Response) {
  let { page, size, order } = req.query;
  const { limit, offset } = getPagination(Number(page), Number(size))

  getPopularPosts(limit, offset, String(order))
    .then(async data => {
      // setting correct amount of row count
      data.count = data.count.length

      // setting time property
      for (const row of data.rows) {
        row.dataValues.time = await getPostByTxHashStr(row.dataValues.post).then(post => post.time)
      }

      const response = await getPagingData(data, Number(page), limit)

      log.info(getTimestamp() + ' INFO: Successful response.')
      res.json(response)
    })
    .catch(err => {
      log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      })
    })
}

/**
 * Get most popular boards
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
 async function getPopularBoards(req: Request, res: Response) {
  let { page, size, order } = req.query;
  const { limit, offset } = getPagination(page, size)

  getPopularBoards(limit, offset, order)
    .then(async data => {
      // setting correct amount of row count
      data.count = data.count.length

      const response = await getPagingData(data, page, limit)

      log.info(getTimestamp() + ' INFO: Successful response.')
      res.json(response)
    })
    .catch(err => {
      log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      })
    })
}

export {

};

