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
    // postService.getLatest()
    res.json(new Array(0))
}

/**
 * Get trending postss
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
 postController.getTrending = (req, res) => {
    // postService.getTrending()
    res.json(new Array(0))
}

module.exports = postController