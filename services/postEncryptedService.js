/**
 * PostEncrypted Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Op } = require("sequelize")

const postEncryptedService = {}

/**
 * Get all encrypted posts
 */
postEncryptedService.getAll = async (limit, offset, order, searchKeyword) => {
    let query = {
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    }

    searchKeyword ? (query.where = {
        [Op.or]: [
            { 'message': { [Op.iLike]: '%' + searchKeyword + '%' } },
            { 'board': { [Op.iLike]: '%' + searchKeyword + '%' } },
        ]
    }) : query

    return models.PostEncrypted.findAndCountAll(query)
}

/**
 * Get encrypted post by tx_hash
 */
postEncryptedService.getEncryptedPostByTxHash = async (req) => {
    return models.PostEncrypted.findOne({
        where: {
            tx_hash: req.params.tx_hash
        }
    })
}

/**
 * Get latest encrypted posts
 */
postEncryptedService.getLatest = async (limit, offset, order) => {
    return models.PostEncrypted.findAndCountAll({
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    })
}

module.exports = postEncryptedService