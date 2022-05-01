/**
 * Hashtag Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");
const {getPagination, getPagingData} = require("../utils/pagination");
const postService = require("./postService");
const log = require("loglevel");
const {getTimestamp} = require("../utils/time");

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = async (page, size, limit, offset) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
    })
}

/**
 * Get hashtag by id
 */
hashtagService.getHashTagById = async (req) => {
    return models.Hashtag.findOne({
        where: {
            id: req.params.id
        }
    })
}

/**
 * Get latest hashtags
 */
hashtagService.getLatest = async (page, size, limit, offset) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        offset: offset,
    })
}

/**
 * Get trending posts
 */
//TODO: this currently does not work to count number posts and return the count instead of the
// objects. This needs to be fixed to avoid big and expensive queries
hashtagService.getTrending = async (page, size, limit, offset) => {
    // filter posts under a week time

    return models.Hashtag.findAndCountAll({
        attributes: [
            'hashtag.id',
            'hashtag_name',
            [db.sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.id = post_hashtag.post_id)'), 'n_post']
        ],
        // group: 'hashtag.id',
        // subQuery: false,
        limit: limit,
        order: [[db.sequelize.literal('PostCount'), 'DESC']],
        offset: offset,
        include: [{
            model: models.Post,
            as: 'posts',
            required: false, // will create a left join
            /*attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('post.id')), 'n_post']
            ]*/
            /*attributes: {
                include: [
                    [db.sequelize.fn('COUNT', '*'), 'n_post'],
                ]
            },*/
        }],


    })
}

module.exports = hashtagService