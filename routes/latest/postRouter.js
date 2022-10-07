/**
 * Post routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/postController')

// NOTE: the ordering here is important

/**
 * @openapi
 * /api/v2/posts/latest:
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
 * /api/v2/posts:
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
 * /api/v2/posts/{tx_hash}:
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

router.post('/posts', controller.postMessage)


module.exports = router
