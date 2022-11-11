// Copyright (c) 2022-2022, The Kryptokrona Project

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
 * Post Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const postService = require('../../services/postService')
const { getPagination, getPagingDataPost } = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime } = require("../../utils/time")

const postController = {}

/**
 * Get all posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getAll = async (req, res) => {
    let { page, size, order, search, from, to, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(from)
    const endDateParam = convertUnixToDateTime(to)

    excludeAvatar = (excludeAvatar === undefined || excludeAvatar === 'true')

    postService.getAll(limit, offset, order, search, from ? startDateParam : from, to ? endDateParam : to, excludeAvatar)
        .then(async data => {
            // converts the standard UTC to unix timestamp
            for (const row of data.rows) {
                row.dataValues.created_at = convertDateTimeToUnix(row.dataValues.createdAt)
                row.dataValues.updated_at = convertDateTimeToUnix(row.dataValues.updatedAt)
                row.dataValues.reply_tx_hash = row.dataValues.reply
                row.dataValues.replies = await postService.getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
                row.dataValues.time = parseInt(row.dataValues.time)

                // a very ugly fix (probably permanent as it usually is)
                delete row.dataValues.createdAt
                delete row.dataValues.updatedAt
                delete row.dataValues.reply
            }

            const response = await getPagingDataPost(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)

        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get a specific posts by tx_hash
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getPostByTxHash = async (req, res) => {
    postService.getPostByTxHash(req)
        .then(async data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
                // converts the standard UTC to unix timestamp
                data.dataValues.created_at = convertDateTimeToUnix(data.dataValues.createdAt)
                data.dataValues.updated_at = convertDateTimeToUnix(data.dataValues.updatedAt)
                data.dataValues.replies = await postService.getAllRepliesOfPost(data.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))

                // a very ugly fix (probably permanent as it usually is)
                delete data.dataValues.createdAt
                delete data.dataValues.updatedAt
                res.json(data)
            }
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get latest posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getLatest = async (req, res) => {
    let { page, size, order, search, from, to, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(page, size)

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(from)
    const endDateParam = convertUnixToDateTime(to)

    excludeAvatar = (excludeAvatar === undefined || excludeAvatar === 'true')

    postService.getLatest(limit, offset, order, search, from ? startDateParam : from, to ? endDateParam : to, excludeAvatar)
        .then(async data => {
            // converts the standard UTC to unix timestamp
            for (const row of data.rows) {
                row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
                row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
                row.dataValues.replies = await postService.getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
                row.dataValues.reply_tx_hash = row.dataValues.reply
                row.dataValues.time = parseInt(row.dataValues.time)

                // a very ugly fix (probably permanent as it usually is)
                delete row.dataValues.createdAt
                delete row.dataValues.updatedAt
                delete row.dataValues.reply
            }

            const response = await getPagingDataPost(data, page, limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Send message
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.sendMessage = async (req, res) => {
    try {
        const result = await wallet.sendTransactionAdvanced(
            [[wallet.getPrimaryAddress(), 1]], // destinations,
            3, // mixin
            { fixedFee: 1000, isFixedFee: true }, // fee
            undefined, //paymentID
            undefined, // subWalletsToTakeFrom
            undefined, // changeAddress
            true, // relayToNetwork
            false, // sendAll
            Buffer.from(req.body.payload, 'hex')
        )

        res.json(result)
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Some error occurred while sending message. ' + err)
        res.json("Sorry, but your request is invalid.")
    }

}

module.exports = postController
