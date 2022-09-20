/**
 * Swagger configuration.
 */

'use strict'

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import fs from "fs";

let swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${process.env.SYS_PROJECT_NAME}`,
      version: '2.0.0',
      contact: {
        name: process.env.SYS_SWAGGER_CONTACT_NAME,
        email: process.env.SYS_SWAGGER_CONTACT_EMAIL,
        url: process.env.SYS_SWAGGER_CONTACT_URL
      },
      license: {
        name: 'GNU General Public License v3.0',
        url: 'https://github.com/kryptokrona/hugin-api/blob/main/LICENSE'
      },
      externalDocs: {
        description: 'Find out more about the project on Kryptokrona Docs',
        url: 'https//docs.kryptokrona.org'
      }
    },
    servers: [
      {
        url: `https://api.hugin.chat`,
        description: 'The Official Hugin API hosted by Kryptokrona project'
      },
      {
        url: `https://hugin-api.novastack.org`,
        description: 'High Performance Hugin API Powered by Novastack Hosting'
      },
      {
        url: `https://test-api.novastack.org`,
        description: 'Used to test new/latest features before running on main Novastack Hugin API'
      },
      {
        url: `https://cache.norpool.org`,
        description: 'Norpool Hugin API'
      }
    ]

  },
  apis: ['./routes/v1/*.js', './routes/latest/*.js'],
}

// adding localhost to api docs if we are working on development
if (process.env.NODE_ENV === 'development') {
  swaggerOptions.definition.servers.push(
      {
        url: `http://localhost:3000`,
        description: 'Development Hugin API'
      },
    )
}

const swaggerCustomOptions = {
  customCss: fs.readFileSync('./public/static/css/openapi.css').toString(),
  customSiteTitle: `${process.env.SYS_PROJECT_NAME} Docs`,
  customfavIcon: process.env.NODE_ENV === 'development' ? '/static/img/favicon.ico' : '/static/img/favicon.ico',
}

export = {
  swaggerOptions, 
  swaggerCustomOptions
}
