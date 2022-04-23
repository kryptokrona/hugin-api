/**
 * Index routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/indexController')

router.get('/', controller.index)

module.exports = router