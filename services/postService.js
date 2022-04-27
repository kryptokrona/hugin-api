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
    db.connect()
        .then((connection) => {
            console.log('connection...')
        })
    console.log('Post Service: getting latest posts...')
}

/**
 * Get trending posts
 */
postService.getTrending = () => {
    console.log('Post Service: getting trending posts...')
}

module.exports = postService