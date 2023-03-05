// Copyright (c) 2022-2023, The Kryptokrona Project
//
// Created by Marcus Cvjeticanin
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Swagger configuration.
 */

'use strict'

require('dotenv').config()

const fs = require('fs')

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
                url: `https://n1.vxo.nu`,
                description: 'Växjö #1 Hugin API hosted by Marcus Cvjeticanin'
            },
            {
                url: `https://n2.vxo.nu`,
                description: 'Växjö #2 Hugin API hosted by Marcus Cvjeticanin'
            },
            {
                url: `https://hugin-api.novastack.org`,
                description: 'High Performance Hugin API Powered by Novastack Hosting'
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

module.exports = {
    swaggerOptions, swaggerCustomOptions
}
