/**
 * Hashtag Controller
 */

'use strict'

let log = require('loglevel')
let db = require("../../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

import { Request, Response } from "express";

import { getAll, getById, getLatest } from "../../service/hashtagService";
import { getTimestamp } from "../../util/time";
import { getPagination, getPagingData } from "../../util/pagination";

/**
 * Get all hashtags
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getAllHashtags(req: Request, res: Response) {
    const { page, size, order, search } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size))

    getAll(limit, offset, String(order), String(search))
        .then(async (data: any) => {
            const response = await getPagingData(data, Number(page), limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)
        })
        .catch((err: unknown) => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get hashtag by id
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getHashtagById(req: Request, res: Response) {
    getById(req.params.id)
        .then((data: any) => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
                res.json(data)
            }
        })
        .catch((err: unknown) => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get latest hashtags
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getLatestHashtag(req: Request, res: Response) {
    const { page, size, order } = req.query
    const { limit, offset } = getPagination(Number(page), Number(size))

    getLatest(limit, offset, String(order))
        .then(async (data: any) => {
            const response = await getPagingData(data, Number(page), limit)
            log.info(getTimestamp() + ' INFO: Successful response.')
            res.json(response)
        })
        .catch((err: unknown) => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err || 'Some error occurred while retrieving data.'
            })
        })
}

export {
    getAllHashtags,
    getHashtagById,
    getLatestHashtag
};
