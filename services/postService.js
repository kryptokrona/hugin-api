/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");

const postService = {}

/**
 * Get all posts
 */
postService.getAll = async (page, size, limit, offset) => {
    return models.Post.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
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

/**
 * Get trending posts
 */
postService.getTrending = () => {
    // query data with findAndCountAll
    //
    // between todays date and past days (week?)
    console.log('Post Service: getting trending posts...')
}

module.exports = postService