/**
 * Post routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')

// the ordering here is important
router.get('/posts/latest', controller.getLatest)
router.get('/posts', controller.getAll)
router.get('/posts/:tx_hash', controller.getPostByTxHash)


module.exports = router