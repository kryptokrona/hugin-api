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
const { getPagination, getPagingData} = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime} = require("../../utils/time")

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

module.exports = postEncryptedController
