/**
 * Post Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postService = require('../../services/postService')
const { getPagination, getPagingData} = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime} = require("../../utils/time")

const postController = {}

/**
 * Get all posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getAll = async (req, res) => {
    let { page, size, order, search, startDate, endDate, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(startDate)
    const endDateParam = convertUnixToDateTime(endDate)

    excludeAvatar = (excludeAvatar === undefined || excludeAvatar === 'true')

    postService.getAll(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate, excludeAvatar)
        .then(async data => {
          // converts the standard UTC to unix timestamp
          for (const row of data.rows) {
            row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
            row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            row.dataValues.replies = await postService.getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
          }

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
 * Get a specific posts by tx_hash
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getPostByTxHash = async (req, res) => {
    postService.getPostByTxHash(req)
        .then(async data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
                // converts the standard UTC to unix timestamp
                data.dataValues.createdAt = convertDateTimeToUnix(data.dataValues.createdAt)
                data.dataValues.updatedAt = convertDateTimeToUnix(data.dataValues.updatedAt)
                data.dataValues.replies = await postService.getAllRepliesOfPost(data.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
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
 * Get latest posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getLatest = async (req, res) => {
    let { page, size, order, search, startDate, endDate, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(startDate)
    const endDateParam = convertUnixToDateTime(endDate)

    excludeAvatar = (excludeAvatar === undefined || excludeAvatar === 'true')

    postService.getLatest(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate, excludeAvatar)
      .then(async data => {
          // converts the standard UTC to unix timestamp
          for (const row of data.rows) {
            row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
            row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            row.dataValues.replies = await postService.getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
          }

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

module.exports = postController
