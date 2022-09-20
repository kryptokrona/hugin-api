/**
 * Hashtag Service
 */

'use strict'

import { Op, QueryTypes } from "sequelize";
import { Hashtag } from "../database/models/hashtag";

/**
 * Get all hashtags
 */
async function getAll(limit: number, offset: number, order: string, searchKeyword: string) {
    let query: any = {
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
async function getById(hashtagId: string) {
    return models.Hashtag.findOne({
        where: {
            id: hashtagId
        }
    })
}

/**
 * Get latest hashtags
 */
async function getLatest(limit: number, offset: number, order: string) {
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
    getById,
    getLatest
};
