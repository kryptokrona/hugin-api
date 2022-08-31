/**
 * PostEncrypted Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postEncryptedService = require('../../services/latest/postEncryptedService')
const { getPagination, getPagingData} = require('../../utils/pagination')
const { getTimestamp } = require("../../utils/time")

const postEncryptedController = {}

/**
 * Get all encrypted posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getAll = async (req, res) => {
    const { page, size, order, search, startDate, endDate } = req.query;
    const { limit, offset } = getPagination(page, size)

    postEncryptedService.getAll(limit, offset, order, search, startDate ? new Date(startDate) : startDate, endDate ? new Date(endDate) : endDate)
        .then(data => {
            const response = getPagingData(data, page, limit)
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
    const { page, size, order, search, startDate, endDate } = req.query;
    const { limit, offset } = getPagination(page, size)

    postEncryptedService.getLatest(limit, offset, order, search, startDate ? new Date(startDate) : startDate, endDate ? new Date(endDate) : endDate)
        .then(data => {
            const response = getPagingData(data, page, limit)
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
