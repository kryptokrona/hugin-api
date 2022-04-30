/**
 * Hashtag Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postService = require('../services/hashtagService')
const { getPagination, getPagingData} = require('../utils/pagination')
const { getTimestamp } = require("../utils/time");

const hashtagController = {}

/**
 * Get all hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getAll = (req, res) => {
    // postService.getTrending()
    res.json(new Array(0))
}

module.exports = hashtagController