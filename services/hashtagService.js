/**
 * Hashtag Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = () => {
    console.log('Post Service: getting all hashtags...')
}

/**
 * Get hashtag by id
 */
hashtagService.getHashTagById = () => {
    console.log('Post Service: getting hashtags by id...')
}

module.exports = hashtagService