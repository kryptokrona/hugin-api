/**
 * PostgreSQL configuration.
 */

'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize');

var sequelize = new Sequelize(
  process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : process.env.DEV_DATABASE_URL
);

try {
  sequelize.authenticate()
      .then(r =>
          //TODO: we need to do a initial migrate on start (only if it hasn't before)
          console.log('Connection to database has been established successfully.')
      );
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;