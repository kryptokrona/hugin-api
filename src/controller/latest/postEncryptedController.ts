/**
 * PostEncrypted Controller
 */

'use strict'

import log from "loglevel";
import { Request, Response } from "express";

import { getAll, getByTxHash, getLatest } from "../../service/postEncryptedService";
import { getTimestamp, convertUnixToDateTime, convertDateTimeToUnix } from "../../util/time";
import { getPagination, getPagingData } from "../../util/pagination";


/**
 * Get all encrypted posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getAllEncryptedPosts(req: Request, res: Response) {
    const { page, size, order, search, startDate, endDate } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size))

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(Number(startDate))
    const endDateParam = convertUnixToDateTime(Number(endDate))

    getAll(limit, offset, String(order), String(search), startDateParam, endDateParam)
      .then(async data => {
            // converts the standard UTC to unix timestamp
            data.rows.forEach(row => {
              row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
              row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            })
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
 * Get a specific encrypted posts by tx_hash
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
 async function getEncryptedPostByTxHash(req: Request, res: Response) {
    getByTxHash(req)
        .then(data => {
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
 * Get latest encrypted posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
 async function getLatestEncryptedPosts(req: Request, res: Response) {
    const { page, size, order, search, startDate, endDate } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size))

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(Number(startDate))
    const endDateParam = convertUnixToDateTime(Number(endDate))

    getLatest(limit, offset, String(order), String(search), startDateParam, endDateParam)
        .then(async data => {
            // converts the standard UTC to unix timestamp
            data.rows.forEach(row => {
              row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
              row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            })
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

export {
    getAllEncryptedPosts,
    getEncryptedPostByTxHash,
    getLatestEncryptedPosts
};