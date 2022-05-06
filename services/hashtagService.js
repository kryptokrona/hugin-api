/**
 * Hashtag Service
 */

'use strict'

const { Op } = require("sequelize")
const db = require('../configs/postgresql')
const models = require("../database/models")

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = async (limit, offset, searchKeyword) => {
    let query = {
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
    }

    searchKeyword ? (query.where = {
        [Op.or]: [
            { 'name': { [Op.like]: '%' + searchKeyword + '%' } }
        ]
    }) : query

    return models.Hashtag.findAndCountAll(query)
}

/**
 * Get hashtag by id
 */
hashtagService.getHashTagById = async (hashtagId) => {
    return models.Hashtag.findOne({
        where: {
            id: hashtagId
        }
    })
}

/**
 * Get latest hashtags
 */
hashtagService.getLatest = async (limit, offset) => {
    return models.Hashtag.findAndCountAll({
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
//TODO: this currently does NOT work to count number posts and return the count instead of the
// objects. This needs to be fixed to avoid big and expensive queries
hashtagService.getTrending = async (limit, offset) => {
    // filter posts under a week time

    return models.PostHashtag.findAndCountAll({
        group: ['PostHashtag.post_id'],
        limit: limit,
        offset: offset,
        attributes: { 
            include: [[db.sequelize.fn("COUNT", db.sequelize.col("posts.id")), "num_posts"]]
        },
    })
}

module.exports = hashtagService