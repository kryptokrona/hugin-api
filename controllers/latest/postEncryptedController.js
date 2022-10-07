/**
 * PostEncrypted Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postEncryptedService = require('../../services/postEncryptedService')
const { getPagination, getPagingDataPostEncrypted} = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime} = require("../../utils/time")

const postEncryptedController = {}

/**
 * Get all encrypted posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getAll = async (req, res) => {
    let { page, size, order, search, from, to } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(from)
    const endDateParam = convertUnixToDateTime(to)

    postEncryptedService.getAll(limit, offset, order, search, from ? startDateParam : from, to ? endDateParam : to)
      .then(async data => {
            // converts the standard UTC to unix timestamp
            data.rows.forEach(row => {
              row.dataValues.created_at = convertDateTimeToUnix(row.dataValues.createdAt)
              row.dataValues.updated_at = convertDateTimeToUnix(row.dataValues.updatedAt)
              row.dataValues.tx_timestamp = parseInt(row.dataValues.tx_timestamp)

              // a very ugly fix (probably permanent as it usually is)
              delete row.dataValues.createdAt
              delete row.dataValues.updatedAt
            })
            const response = await getPagingDataPostEncrypted(data, page, limit)
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
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getEncryptedPostByTxHash = async (req, res) => {
    postEncryptedService.getEncryptedPostByTxHash(req)
        .then(data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
                // converts the standard UTC to unix timestamp
                data.dataValues.created_at = convertDateTimeToUnix(data.dataValues.createdAt)
                data.dataValues.updated_at = convertDateTimeToUnix(data.dataValues.updatedAt)

                // a very ugly fix (probably permanent as it usually is)
                delete data.dataValues.createdAt
                delete data.dataValues.updatedAt
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
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getLatest = async (req, res) => {
    let { page, size, order, search, from, to } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(from)
    const endDateParam = convertUnixToDateTime(to)

    postEncryptedService.getLatest(limit, offset, order, search, from ? startDateParam : from, to ? endDateParam : to)
        .then(async data => {
            // converts the standard UTC to unix timestamp
            data.rows.forEach(row => {
              row.dataValues.created_at = convertDateTimeToUnix(row.dataValues.createdAt)
              row.dataValues.updated_at = convertDateTimeToUnix(row.dataValues.updatedAt)
              row.dataValues.tx_timestamp = parseInt(row.dataValues.tx_timestamp)

              // a very ugly fix (probably permanent as it usually is)
              delete row.dataValues.createdAt
              delete row.dataValues.updatedAt
            })
            const response = await getPagingDataPostEncrypted(data, page, limit)
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

module.exports = postEncryptedController
