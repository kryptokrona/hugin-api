/**
 * PostEncrypted routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postEncryptedController')

// NOTE: the ordering here is important

router.get('/posts-encrypted/latest', controller.getLatest)
router.get('/posts-encrypted', controller.getAll)
router.get('/posts-encrypted/:tx_hash', controller.getEncryptedPostByTxHash)


module.exports = router
