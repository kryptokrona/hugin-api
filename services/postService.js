// Copyright (c) 2022-2022, The Kryptokrona Project
//
// Created by Marcus Cvjeticanin
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Sequelize, Op } = require("sequelize")

const postService = {}

/**
 * Get all posts
 */
postService.getAll = async (limit, offset, order, searchKeyword, startDate, endDate, excludeAvatar) => {
    let query = {
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

    // don't return avatar column if true
    if (excludeAvatar) {
        query.attributes = {
            exclude: ['avatar'],
        }
    }

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
postService.getLatest = async (limit, offset, order, searchKeyword, startDate, endDate, excludeAvatar) => {
    let query = {
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

    // don't return avatar column if true
    if (excludeAvatar) {
        query.attributes = {
            exclude: ['avatar'],
        }
    }

    return models.Post.findAndCountAll(query)
}

/**
 * Get replies of a post
 */
postService.getAllRepliesOfPost = async (txHash) => {
    return models.Post.findAll({
        attributes: ['tx_hash'],
        where: {
            reply: txHash
        },
        raw: true
    })
}

/**
 * Get post by tx_hash
 */
postService.getPostByTxHashStr = async (txHash) => {
    return models.Post.findOne({
        where: {
            tx_hash: txHash
        }
    })
}

/**
 * Get all popular posts based on replies
 */
postService.getPopularPosts = async (limit, offset, order) => {
    return models.Post.findAndCountAll({
        attributes: [[Sequelize.literal('COUNT(*)'), 'replies'], ['reply', 'post']],
        limit: limit,
        order: [
            ['replies', order ? order.toUpperCase() : 'DESC'],
        ],
        distinct: true,
        offset: offset,
        where: {
            reply: {
                [Op.ne]: null
            }
        },
        group: 'reply',
    })
}

/**
 * Get all popular posts based on replies
 */
postService.getPopularBoards = async (limit, offset, order) => {
    return models.Post.findAndCountAll({
        attributes: [[Sequelize.literal('COUNT(*)'), 'posts'], 'board'],
        limit: limit,
        order: [
            ['posts', order ? order.toUpperCase() : 'DESC'],
        ],
        distinct: true,
        offset: offset,
        where: {
            reply: {
                [Op.ne]: null
            }
        },
        group: 'board',
    })
}

module.exports = postService
