/**
 * PostEncryptedGroup routes.
 */

'use strict'

import express from "express";
const router = express.Router();

import { getAllEncryptedGroupPosts, getEncryptedGroupPostsByTxHash, getLatestEncryptedGroupPosts } from "../../controller/latest/postEncryptedGroupController";

/**
 * @openapi
 * /api/v1/posts-encrypted-group/latest:
 *   get:
 *     description: Gets the latest encrypted group posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of encrypted group posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of encrypted group posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of encrypted group posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *     tags:
 *       - posts encrypted group
 *     responses:
 *       200:
 *         description: Returns the latest encrypted posts.
 */
router.get('/posts-encrypted-group/latest', getLatestEncryptedGroupPosts)

/**
 * @openapi
 * /api/v1/posts-encrypted-group:
 *   get:
 *     description: Gets all encrypted group posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of encrypted group posts (asc/desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword of encrypted group posts
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of encrypted group posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: From a given date and time in unix timestamp - format 1661941082
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: integer
 *           format: int64
 *         description: To a given date and time in unix timestamp - format 1661941082
 *     tags:
 *       - posts encrypted group
 *     responses:
 *       200:
 *         description: Returns all encrypted posts.
 */
router.get('/posts-encrypted-group', getEncryptedGroupPostsByTxHash)

/**
 * @openapi
 * /api/v1/posts-encrypted-group/{tx_hash}:
 *   get:
 *     description: Gets a specific encrypted group post by given transaction hash value.
 *     parameters:
 *       - in: path
 *         name: tx_hash
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction Hash Value (unique to the encrypted post)
 *     tags:
 *       - posts encrypted group
 *     responses:
 *       200:
 *         description: Returns the specific encrypted group post.
 */
router.get('/posts-encrypted-group/:tx_hash', getAllEncryptedGroupPosts)


export default router;