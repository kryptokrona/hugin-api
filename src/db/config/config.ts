/**
 * Database Config
 */

 'use strict'

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

export = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}