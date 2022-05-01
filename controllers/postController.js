/**
 * Post Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postService = require('../services/postService')
const { getPagination, getPagingData} = require('../utils/pagination')
const { getTimestamp } = require("../utils/time");

const postController = {}

/**
 * Get all posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getAll = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    postService.getAll(page, size, limit, offset)
        .then(data => {
            const response = getPagingData(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data.')
            res.status(500).send({
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
 * Get latest posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getLatest = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    postService.getLatest(page, size, limit, offset)
        .then(data => {
            const response = getPagingData(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data.')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

module.exports = postController