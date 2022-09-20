/**
 * Hashtag Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const hashtagService = require('../../services/hashtagService')
const { getPagination, getPagingData} = require('../../utils/pagination')
const { getTimestamp } = require("../../utils/time")

class HashtagController {
    
}

/**
 * Get all hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getAll = (req, res) => {
    const { page, size, order, search } = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getAll(limit, offset, order, search)
        .then(async data => {
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
 * Get hashtag by id
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getHashTagById = (req, res) => {
    hashtagService.getHashTagById(req.params.id)
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
 * Get latest hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getLatest = async (req, res) => {
    const { page, size, order } = req.query
    const { limit, offset } = getPagination(page, size)

    hashtagService.getLatest(limit, offset, order)
        .then(async data => {
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
 * Get trending hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getTrending = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getTrending(page, size, limit, offset)
        .then(async data => {
            let response = await getPagingData(data, page, limit)

            //TODO: this is a temporary fix (check the hashtagService and modify it to avoid this method)
            // we want to do a SQL query instead of this
            /* let jsonStr = JSON.stringify(response)
            let newData = JSON.parse(jsonStr)

            newData.items.forEach(item => {
                item.posts = item.posts.length
            }) */

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

export default HashtagController;
