/**
 * Hashtag Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const hashtagService = require('../services/hashtagService')
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
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getAll(page, size, limit, offset)
        .then(data => {
            const response = getPagingData(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.send(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data.')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get hashtag by ids
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getHashTagById = (req, res) => {
    hashtagService.getHashTagById(req)
        .then(data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.json({})
            } else {
                res.json(data)
            }
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data.')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get latest hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getLatest = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getLatest(page, size, limit, offset)
        .then(data => {
            const response = getPagingData(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.send(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data.')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

module.exports = hashtagController