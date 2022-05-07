/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Op } = require("sequelize")

const postService = {}

/**
 * Get all posts
 */
postService.getAll = async (limit, offset, order, searchKeyword) => {
    let query = {
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    }
    
    searchKeyword ? (query.where = {
        [Op.or]: [
            { 'message': { [Op.like]: '%' + searchKeyword + '%' } }
            //TODO: should be able to search on multiple fields
        ]
    }) : query

    return models.Post.findAndCountAll(query)
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
postService.getLatest = async (limit, offset, order) => {
    return models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    })
}

module.exports = postService