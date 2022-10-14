/**
 * Info routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/infoController')

/**
 * @openapi
 * /api/v1/info:
 *   get:
 *     description: Gets information of Hugin API
 *     tags:
 *       - info
 *     responses:
 *       200:
 *         description: Gets information of Hugin API
 */
router.get('/info', controller.getInfo)

module.exports = router
