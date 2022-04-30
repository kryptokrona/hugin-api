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
    // query data with findAndCountAll
    //
    // between todays date and past days (week?)
    console.log('Post Service: getting all hashtags...')
}

module.exports = hashtagService