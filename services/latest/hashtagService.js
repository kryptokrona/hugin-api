/**
 * Hashtag Service
 */

'use strict'

const { Op, QueryTypes } = require("sequelize")
const db = require('../../configs/postgresql')
const models = require("../../database/models")

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = async (limit, offset, order, searchKeyword) => {
    let query = {
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
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
hashtagService.getLatest = async (limit, offset, order) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
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

    return models.Hashtag.findAndCountAll({
        //limit: limit,
        //offset: offset,
        // group: ['PostHashtag.id', 'hashtag.name'],
        // order: ['num_posts', 'DESC'],
        include: [{
            model: models.Post,
            as: 'posts',
            required: true,
            // attributes: []  // uncomment this later when we can count
        }],
        // raw: true,
        // subQuery: false
    })
}

module.exports = hashtagService
