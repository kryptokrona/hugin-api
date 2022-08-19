/**
 * Swagger configuration.
 */

'use strict'

require('dotenv').config()

const fs = require('fs')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${process.env.SYS_PROJECT_NAME} API`,
      version: '1.0.0',
      contact: {
        name: process.env.SYS_SWAGGER_CONTACT_NAME,
        email: process.env.SYS_SWAGGER_CONTACT_EMAIL,
        url: process.env.SYS_SWAGGER_CONTACT_URL
      },
      license: {
        name: 'GNU General Public License v3.0',
        url: 'https://github.com/kryptokrona/hugin-cache/blob/main/LICENSE'
      },
      externalDocs: {
        description: 'Find out more about the project on Kryptokrona Docs',
        url: 'https//docs.kryptokrona.org'
      }
    },
    servers: [
      {
        url: `http://localhost:3000`,
        description: 'Development Hugin Cache'
      },
      {
        url: `https://cache.hugin.chat`,
        description: 'The Official Hugin Cache API hosted by Kryptokrona project'
      },
      {
        url: `https://cache.novastack.org`,
        description: 'High Performance Hugin Cache API Powered by Novastack Hosting'
      },
      {
        url: `https://testcache.novastack.org`,
        description: 'Used to test new/latest features before running on main Novastack Cache'
      },
      {
        url: `https://cache.norpool.org`,
        description: 'Norpool Hugin Cache API'
      }
    ]

  },
  apis: ['./routes/*.js'],
}

const swaggerCustomOptions = {
  customCss: fs.readFileSync('./public/static/css/openapi.css').toString(),
  customSiteTitle: `${process.env.SYS_PROJECT_NAME} API Docs`,
  customfavIcon: process.env.NODE_ENV === 'development' ? '/static/img/favicon.ico' : '/static/img/favicon.ico',
}

module.exports = {
  swaggerOptions, swaggerCustomOptions
}
