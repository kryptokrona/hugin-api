/**
 * Hashtag Service
 */

'use strict'

const { Op, QueryTypes } = require("sequelize")
const db = require('../configs/postgresql')
const models = require("../database/models")

/**
 * Get all hashtags
 */
async function getAll(limit, offset, order, searchKeyword) {
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
async function getHashTagById(hashtagId) {
    return models.Hashtag.findOne({
        where: {
            id: hashtagId
        }
    })
}

/**
 * Get latest hashtags
 */
async function getLatest(limit, offset, order) {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    })
}

export {
    getAll,
    getHashTagById,
    getLatest
};
