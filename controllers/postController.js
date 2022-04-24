/**
 * Post Controller
 */

'use strict'

const postService = require('../services/postService')

const postController = {}

/**
 * Get latest posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getLatest = (req, res) => {
    postService.getLatest()
    res.json(null)
}

/**
 * Get trending postss
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
 postController.getTrending = (req, res) => {
    postService.getTrending()
    res.json(null)
}

module.exports = postController