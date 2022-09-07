/**
 * Statistics routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/statisticsController')

// NOTE: the ordering here is important

/**
 * @openapi
 * /api/v2/statistics/posts/popular:
 *   get:
 *     description: Gets the most popular posts based on replies.
 *     tags:
 *       - statistics
 *     responses:
 *       200:
 *         description: Returns the most popular posts based on replies.
 */
router.get('/statistics/posts/popular', controller.getPopularPosts)

module.exports = router
