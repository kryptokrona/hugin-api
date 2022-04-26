/**
 * PostgreSQL configuration.
 */

'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize');

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
module.exports.connect = async () => {
  const sequelize = new Sequelize(
    process.env.NODE_ENV === 'production' 
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL
  );

  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');

    // returning the sequalize object on successful connection.
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
