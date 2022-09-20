/**
 * PostEncrypted Service
 */

'use strict'

import { Request } from "express"

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Op } = require("sequelize")

/**
 * Get all encrypted posts
 */
async function getAll(limit: number, offset: number, order: string, searchKeyword: string, startDate: Date, endDate: Date) {
    let query: any = {
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    }

    let opOrList = []

    // checking if startDate or endDate is true - we must have both true
    if (startDate && endDate) {
        opOrList.push({ created_at: { [Op.between]: [startDate, endDate] } })
    }

    // checking if we have a searchKeyword
    if (searchKeyword) {
        opOrList.push({ 'message': { [Op.iLike]: '%' + searchKeyword + '%' } })
        opOrList.push({ 'board': { [Op.iLike]: '%' + searchKeyword + '%' } })
    }

    // adding all statements together
    if (opOrList.length !== 0) {
        query.where = {
            [Op.or]: opOrList
        }
    }

    return models.PostEncrypted.findAndCountAll(query)
}

/**
 * Get encrypted post by tx_hash
 */
 async function getByTxHash(req: Request) {
    return models.PostEncrypted.findOne({
        where: {
            tx_hash: req.params.tx_hash
        }
    })
}

/**
 * Get latest encrypted posts
 */
 async function getLatest(limit: number, offset: number, order: string, searchKeyword: string, startDate: Date, endDate: Date) {
    let query: any = {
        limit: limit,
        order: [
            ['id', order ? order.toUpperCase() : 'DESC'],
        ],
        offset: offset,
    }

    let opOrList = []

    // checking if startDate or endDate is true - we must have both true
    if (startDate && endDate) {
        opOrList.push({ qcreated_at: { [Op.between]: [startDate, endDate] } })
    }

    // checking if we have a searchKeyword
    if (searchKeyword) {
        opOrList.push({ 'message': { [Op.iLike]: '%' + searchKeyword + '%' } })
        opOrList.push({ 'board': { [Op.iLike]: '%' + searchKeyword + '%' } })
    }

    // adding all statements together
    if (opOrList.length !== 0) {
        query.where = {
            [Op.or]: opOrList
        }
    }

    return models.PostEncrypted.findAndCountAll(query)
}

export {
    getAll,
    getByTxHash,
    getLatest
};