/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");
const { Op } = require("sequelize");

const postService = {}

/**
 * Get all posts
 */
//TODO: make parameter of one object instead
postService.getAll = async (page, size, limit, offset) => {
    return models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
        /* //TODO: parse date less than to date greater than and make a where query
        where: {
            created_at: {
                [Op.lt]: new Date(Date.parse(dateLt)),
                [Op.gt]: new Date(Date.parse(dateGt))
            }
        }*/
    })
}

/**
 * Get post by tx_hash
 */
postService.getPostByTxHash = async (req) => {
    return models.Post.findOne({
        where: {
            tx_hash: req.params.tx_hash
        }
    })
}

/**
 * Get latest posts
 */
postService.getLatest = async (page, size, limit, offset) => {
    return models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        offset: offset,
    })
}

module.exports = postService