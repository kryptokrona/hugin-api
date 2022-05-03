/**
 * Hashtag Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = async (page, size, limit, offset) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
    })
}

/**
 * Get hashtag by id
 */
hashtagService.getHashTagById = async (req) => {
    return models.Hashtag.findOne({
        where: {
            id: req.params.id
        }
    })
}

/**
 * Get latest hashtags
 */
hashtagService.getLatest = async (page, size, limit, offset) => {
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
//TODO: this currently does not work to count number posts and return the count instead of the
// objects. This needs to be fixed to avoid big and expensive queries
hashtagService.getTrending = async (page, size, limit, offset) => {
    // filter posts under a week time

    return models.Hashtag.findAndCountAll({
        attributes: { 
            include: [[db.sequelize.literal('(COUNT("posts"."id") OVER (PARTITION BY "hashtag"."id")::int)'), 'posts']] 
        },
        limit: limit,
        offset: offset,
        include: [{
            model: models.Post,
            as: 'posts',
            required: true,
            attributes: [],
            through: {
                attributes: []
            }
        }],
        raw: true,
        subQuery: false
    })
}

module.exports = hashtagService