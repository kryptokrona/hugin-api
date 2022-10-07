/**
 * XKR Syncer.
 */

 'use strict'

 require('dotenv').config()

 let log = require('loglevel')
const { extraDataToMessage } = require('hugin-crypto')


const { getTimestamp } = require('../utils/time')

let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

let models = require('../database/models')
const {logger} = require("sequelize/lib/utils/logger");

/**
 * Wallet sync to fetch data
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
module.exports.walletSync = async () => {
    log.info(getTimestamp() + ' INFO: Wallet syncing.')

    
}

