/**
 * Statistics routes.
 */

'use strict'

import express from "express";
const router = express.Router();

import { getPopularBoardPosts, getPopularBoardsByReplies } from "../../controller/latest/statisticsController";

/**
 * @openapi
 * /api/v1/statistics/posts/popular:
 *   get:
 *     description: Gets the most popular posts based on replies.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of posts (asc/desc)
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
 *       - statistics
 *     responses:
 *       200:
 *         description: Returns the most popular posts based on replies.
 */
router.get('/statistics/posts/popular', getPopularBoardPosts)

/**
 * @openapi
 * /api/v1/statistics/boards/popular:
 *   get:
 *     description: Gets the most popular boards based on posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of boards (asc/desc)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of boards per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - statistics
 *     responses:
 *       200:
 *         description: Returns the most popular boards based on posts.
 */
router.get('/statistics/boards/popular', getPopularBoardsByReplies)

export default router;
