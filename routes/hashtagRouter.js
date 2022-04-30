/**
 * Hashtag routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/hashtagController')

router.get('/hashtags', controller.getAll)

module.exports = router