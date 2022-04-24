/**
 * Post Service
 */

'use strict'

const postService = {}

/**
 * Get latest posts
 */
postService.getLatest = () => {
    console.log('Post Service: getting latest posts...')
}

postService.getTrending = () => {
    console.log('Post Service: getting trending posts...')
}

module.exports = postService