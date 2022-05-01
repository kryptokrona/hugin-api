/**
 * Hashtag routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/hashtagController')

// the ordering here is important
router.get('/hashtags/latest', controller.getLatest)
router.get('/hashtags/trending', controller.getTrending)
router.get('/hashtags', controller.getAll)
router.get('/hashtags/:id', controller.getHashTagById)

module.exports = router