/**
 * PostgreSQL configuration.
 */

'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize')
const log = require("loglevel")
const {getTimestamp} = require("../utils/time")

let sequelize

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(process.env.DEV_DATABASE_URL)
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL)
}

try {
  sequelize.authenticate()
      .then(r =>
          log.info(getTimestamp() + ' INFO: Connection to database has been established successfully.')
      );
} catch (err) {
    log.error(getTimestamp() + ' ERROR: Unable to connect to the database - ', err)
}

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
