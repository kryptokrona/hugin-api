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

module.exports = hashtagService