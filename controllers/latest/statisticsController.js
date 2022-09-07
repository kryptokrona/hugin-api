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

const statisticsController = {}

/**
 * Get most popular posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
statisticsController.getPopularPosts = async (req, res) => {
  postService.getPopularPosts()
    .then(async data => {
      log.info(getTimestamp() + ' INFO: Successful response.')
      res.json(data)
    })
    .catch(err => {
      log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving data.'
      })
    })
}

module.exports = statisticsController
