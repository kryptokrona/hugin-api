/**
 * Post Controller
 */

'use strict'

const postService = require('../services/postService')

let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

const Op = db.Sequelize.Op;

let models = require('../database/models')

const postController = {}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, posts, totalPages, currentPage };
};

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

/**
 * Get latest posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getLatest = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size)

    await models.Post.findAndCountAll({
        limit: 10,
        order: [
            ['id', 'DESC'],
        ],
        offset: 0,
    })
        .then(data => {
        const response = getPagingData(data, page, limit)
        res.send(response)
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get trending postss
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getTrending = (req, res) => {
    // postService.getTrending()
    res.json(new Array(0))
}

module.exports = postController