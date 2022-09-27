/**
 * Hashtag routes.
 */

'use strict'

import express from "express";
const router = express.Router();

import { getAllHashtags, getHashtagById, getLatestHashtag } from "../../controller/latest/hashtagController";

/**
 * @openapi
 * /api/v1/hashtags/latest:
 *   get:
 *     description: Gets the latest hashtags.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns the latest hashtags.
 */
router.get('/hashtags/latest', getLatestHashtag);

/**
 * @openapi
 * /api/v1/hashtags:
 *   get:
 *     description: Gets all hashtags.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of hashtags (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of hashtags
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of hashtags per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns all hashtags.
 */
router.get('/hashtags', getAllHashtags);

/**
 * @openapi
 * /api/v1/hashtags/{id}:
 *   get:
 *     description: Gets a specific hashtag by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Hashtag ID
 *     tags:
 *       - hashtags
 *     responses:
 *       200:
 *         description: Returns the specific hashtag.
 */
router.get('/hashtags/:id', getHashtagById);

export default router;
