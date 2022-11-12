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
 * Post routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/postController')
const { postMessageLimiter } = require('../../configs/rateLimit')

// NOTE: the ordering here is important

/**
 * @openapi
 * /api/v1/posts/latest:
 *   get:
 *     description: Gets the latest posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: to
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: excludeAvatar
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Exclude avatar column - true or false
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: Returns the latest posts.
 */
router.get('/posts/latest', controller.getLatest)

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     description: Gets all posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: to
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: excludeAvatar
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Exclude avatar column - true or false
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: Returns all posts.
 */
router.get('/posts', controller.getAll)

/**
 * @openapi
 * /api/v1/posts/{tx_hash}:
 *   get:
 *     description: Gets a specific post by given transaction hash value.
 *     parameters:
 *       - in: path
 *         name: tx_hash
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction Hash Value (unique to the post)
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: Returns the specific post.
 */
router.get('/posts/:tx_hash', controller.getPostByTxHash)

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     description: Saves a post.
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: Saves a post to the blockchain.
 */
router.post('/posts', postMessageLimiter, controller.sendMessage)


module.exports = router
