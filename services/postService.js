/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')

const postService = {}

/**
 * Get latest posts
 */
postService.getLatest = () => {
    console.log('Post Service: getting latest posts...')
}

/**
 * Get trending posts
 */
postService.getTrending = () => {
    console.log('Post Service: getting trending posts...')
}

module.exports = postService