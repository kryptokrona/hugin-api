/**
 * Statistics Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postService = require('../../services/postService')
const { getTimestamp } = require("../../utils/time")
const {getPagination, getPagingData} = require("../../utils/pagination");

const statisticsController = {}

/**
 * Get most popular posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
statisticsController.getPopularPosts = async (req, res) => {
  let { page, size, order } = req.query;
  const { limit, offset } = getPagination(page, size)

  postService.getPopularPosts(limit, offset, order)
    .then(async data => {
      // setting correct amount of row count
      data.count[0].count = data.rows.length

      // setting time property
      for (const row of data.rows) {
        row.dataValues.time = await postService.getPostByTxHash(row.dataValues.post).then(post => post.time)
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

module.exports = statisticsController
