/**
 * Hashtag routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/v1/hashtagController')

// NOTE: the ordering here is important

/**
 * @openapi
 * /v1/hashtags/latest:
 *   get:
 *     description: Gets the latest hashtags.
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
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns the latest hashtags.
 */
router.get('/hashtags/latest', controller.getLatest)

/**
 * @openapi
 * /v1/hashtags/trending:
 *   get:
 *     description: Gets the trending hashtags.
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
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns the trending hashtags.
 */
router.get('/hashtags/trending', controller.getTrending)

/**
 * @openapi
 * /v1/hashtags:
 *   get:
 *     description: Gets all hashtags.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of hashtags (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of hashtags
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of hashtags per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns all hashtags.
 */
router.get('/hashtags', controller.getAll)

/**
 * @openapi
 * /v1/hashtags/{id}:
 *   get:
 *     description: Gets a specific hashtag by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Hashtag ID
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns the specific hashtag.
 */
router.get('/hashtags/:id', controller.getHashTagById)

module.exports = router
