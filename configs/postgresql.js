/**
 * PostgreSQL configuration.
 */

'use strict'

require('dotenv').config()

const { Client } = require('pg')

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
module.exports.connect = async () => {

  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  return client.connect(err => {
    if (err) {
      console.error('Connection error...', err.stack)
    } else {
      console.log('Connected to PostgreSQL database...')
    }
  })
}
