/**
 * PostEncryptedGroup Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postEncryptedGroupService = require('../../services/postEncryptedGroupService')
const { getPagination, getPagingDataPostEncryptedGroup } = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime} = require("../../utils/time")
const postService = require("../../services/postService");

const postEncryptedController = {}

/**
 * Get all encrypted group posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getAll = async (req, res) => {
  const { page, size, order, search, startDate, endDate } = req.query;
  const { limit, offset } = getPagination(page, size)

  // converts to datetime format since it's stored in the db as such
  const startDateParam = convertUnixToDateTime(startDate)
  const endDateParam = convertUnixToDateTime(endDate)

  postEncryptedGroupService.getAll(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate)
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
      const response = await getPagingDataPostEncryptedGroup(data, page, limit)
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
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getEncryptedGroupPostByTxHash = async (req, res) => {
  postEncryptedGroupService.getEncryptedGroupPostByTxHash(req)
    .then(async data => {
      log.info(getTimestamp() + ' INFO: Successful response.')

      // send empty object if we can not find the post
      if (data === null) {
        res.status(404).json({})
      } else {
        // converts the standard UTC to unix timestamp
        data.dataValues.created_at = convertDateTimeToUnix(data.dataValues.createdAt)
        data.dataValues.updated_at = convertDateTimeToUnix(data.dataValues.updatedAt)
        data.dataValues.replies = await postService.getAllRepliesOfPost(data.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))

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
 * Get latest encrypted group posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postEncryptedController.getLatest = async (req, res) => {
  const { page, size, order, search, startDate, endDate } = req.query;
  const { limit, offset } = getPagination(page, size)

  // converts to datetime format since it's stored in the db as such
  const startDateParam = convertUnixToDateTime(startDate)
  const endDateParam = convertUnixToDateTime(endDate)

  postEncryptedGroupService.getLatest(limit, offset, order, search, startDate ? startDateParam : startDate, endDate ? endDateParam : endDate)
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
      const response = await getPagingDataPostEncryptedGroup(data, page, limit)
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
