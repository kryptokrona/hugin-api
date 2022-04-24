/**
 * Post routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')

router.get('/posts/latest', controller.getLatest)
router.get('/posts/trending', controller.getTrending)

module.exports = router