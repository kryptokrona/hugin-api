/**
 * Hashtag routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/hashtagController')

router.get('/hashtags', controller.getAll)
router.get('/hashtags/:id', controller.getHashTagById)

module.exports = router