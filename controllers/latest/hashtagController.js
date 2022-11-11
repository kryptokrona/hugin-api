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
 * Hashtag Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

const hashtagService = require('../../services/hashtagService')
const { getPagination, getPagingDataHashtag } = require('../../utils/pagination')
const { getTimestamp } = require("../../utils/time")

const hashtagController = {}

/**
 * Get all hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getAll = (req, res) => {
    const { page, size, order, search } = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getAll(limit, offset, order, search)
        .then(async data => {
            const response = await getPagingDataHashtag(data, page, limit)
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
 * Get hashtag by id
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getHashTagById = (req, res) => {
    hashtagService.getHashTagById(req.params.id)
        .then(data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
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
 * Get latest hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getLatest = async (req, res) => {
    const { page, size, order } = req.query
    const { limit, offset } = getPagination(page, size)

    hashtagService.getLatest(limit, offset, order)
        .then(async data => {
            const response = await getPagingDataHashtag(data, page, limit)
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
 * Get trending hashtags
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
hashtagController.getTrending = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    hashtagService.getTrending(page, size, limit, offset)
        .then(async data => {
            let response = await getPagingDataHashtag(data, page, limit)

            //TODO: this is a temporary fix (check the hashtagService and modify it to avoid this method)
            // we want to do a SQL query instead of this
            /* let jsonStr = JSON.stringify(response)
            let newData = JSON.parse(jsonStr)

            newData.items.forEach(item => {
                item.posts = item.posts.length
            }) */

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

module.exports = hashtagController
