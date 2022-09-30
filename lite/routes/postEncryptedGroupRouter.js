/**
 * PostEncryptedGroup routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postEncryptedGroupController')

// NOTE: the ordering here is important

router.get('/posts-encrypted-group/latest', controller.getLatest)
router.get('/posts-encrypted-group', controller.getAll)
router.get('/posts-encrypted-group/:tx_hash', controller.getEncryptedGroupPostByTxHash)


module.exports = router
