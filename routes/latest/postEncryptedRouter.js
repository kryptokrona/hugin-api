/**
 * PostEncrypted routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/postEncryptedController')

// NOTE: the ordering here is important

/**
 * @openapi
 * /api/v2/posts-encrypted/latest:
 *   get:
 *     description: Gets the latest encrypted posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of encrypted posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of encrypted posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of encrypted posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *     tags:
 *       - posts encrypted
 *     responses:
 *       200:
 *         description: Returns the latest encrypted posts.
 */
router.get('/posts-encrypted/latest', controller.getLatest)

/**
 * @openapi
 * /api/v2/posts-encrypted:
 *   get:
 *     description: Gets all encrypted posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of encrypted posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of encrypted posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of encrypted posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *     tags:
 *       - posts encrypted
 *     responses:
 *       200:
 *         description: Returns all encrypted posts.
 */
router.get('/posts-encrypted', controller.getAll)

/**
 * @openapi
 * /api/v2/posts-encrypted/{tx_hash}:
 *   get:
 *     description: Gets a specific encrypted post by given transaction hash value.
 *     parameters:
 *       - in: path
 *         name: tx_hash
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction Hash Value (unique to the encrypted post)
 *     tags:
 *       - posts encrypted
 *     responses:
 *       200:
 *         description: Returns the specific encrypted post.
 */
router.get('/posts-encrypted/:tx_hash', controller.getEncryptedPostByTxHash)


module.exports = router
