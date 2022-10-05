/**
 * Database Config
 */

 'use strict'

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { Dialect, Sequelize } from 'sequelize'

let sequelizeConnection: Sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelizeConnection = new Sequelize(process.env.DEV_DATABASE_URL)
} else {
  sequelizeConnection = new Sequelize(process.env.DATABASE_URL)
}

export default sequelizeConnection;