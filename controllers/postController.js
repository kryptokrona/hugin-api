/**
 * Post Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const { postService } = require('../services/postService')
const { getPagination, getPagingData} = require('../utils/pagination')
let models  = require('../database/models')
const { getTimestamp } = require("../utils/time");

const postController = {}

/**
 * Get all posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getAll = async (req, res) => {
    console.log("req.query (getAll: " + req.query.toString())
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size)

    //TODO: move to service later
    await models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
    })
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
 * Get a specific posts by tx_hash
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getPostByTxHash = async (req, res) => {
    // postService.getPostByTxHash()
    await models.Post.findOne({
        where: {
            tx_hash: req.params.tx_hash
        }
    })
        .then(data => {
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(data)
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
    console.log("req.query (getLatest: " + req.query)
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    //TODO: move to service later
    await models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        offset: offset,
    })
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
 * Get trending posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getTrending = (req, res) => {
    // postService.getTrending()
    res.json(new Array(0))
}

module.exports = postController