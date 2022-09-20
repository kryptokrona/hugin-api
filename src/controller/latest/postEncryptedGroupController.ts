/**
 * PostEncryptedGroup Controller
 */

'use strict'

import log from "loglevel";
import { Request, Response } from "express";

import {  } from "../../service/postEncryptedGroupService";
import { getTimestamp, convertUnixToDateTime, convertDateTimeToUnix } from "../../util/time";
import { getPagination, getPagingData } from "../../util/pagination";

/**
 * Get all encrypted group posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getAllEncryptedGroupPosts(req: Request, res: Response) {
  const { page, size, order, search, startDate, endDate } = req.query;
  const { limit, offset } = getPagination(page, size)

  // converts to datetime format since it's stored in the db as such
  const startDateParam = convertUnixToDateTime(startDate)
  const endDateParam = convertUnixToDateTime(endDate)

  postEncryptedGroupService.getAll(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate)
    .then(async data => {
      // converts the standard UTC to unix timestamp
      data.rows.forEach(row => {
        row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
        row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
      })
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

/**
 * Get a specific encrypted group posts by tx_hash
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getEncryptedGroupPostsByTxHash(req: Request, res: Response) {
  postEncryptedGroupService.getEncryptedGroupPostByTxHash(req)
    .then(async data => {
      log.info(getTimestamp() + ' INFO: Successful response.')

      // send empty object if we can not find the post
      if (data === null) {
        res.status(404).json({})
      } else {
        // converts the standard UTC to unix timestamp
        data.dataValues.createdAt = convertDateTimeToUnix(data.dataValues.createdAt)
        data.dataValues.updatedAt = convertDateTimeToUnix(data.dataValues.updatedAt)
        res.json(data)
      }
    })
    .catch(err => {
      log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      })
    })
}

/**
 * Get latest encrypted group posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getLatestEncryptedGroupPosts(req: Request, res: Response) {
  const { page, size, order, search, startDate, endDate } = req.query;
  const { limit, offset } = getPagination(page, size)

  // converts to datetime format since it's stored in the db as such
  const startDateParam = convertUnixToDateTime(startDate)
  const endDateParam = convertUnixToDateTime(endDate)

  postEncryptedGroupService.getLatest(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate)
    .then(async data => {
      // converts the standard UTC to unix timestamp
      data.rows.forEach(row => {
        row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
        row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
      })
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
  getAllEncryptedGroupPosts,
  getEncryptedGroupPostsByTxHash,
  getLatestEncryptedGroupPosts
};