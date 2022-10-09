'use strict'

require('dotenv').config()

let server = require('../../../server')
let chai = require('chai')
let chaiHttp = require('chai-http')
let request = require('supertest')

const { expect } = chai

chai.should()
chai.use(chaiHttp)

const post1 = {
    id: 1,
    message: 'Reading about Tropicana Crunch.. Dont look it up',
    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
    board: 'Home',
    time: '1651680078',
    nickname: 'kryptoknugen',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    reply: null,
    replies: [],
    createdAt: 0,
    updatedAt: 0,
}

const post2 = {
    id: 2,
    message: 'Hugin Messenger is freakin awesome',
    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
    board: 'Hugin',
    time: '1651680078',
    nickname: 'mjovanc',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    reply: null,
    replies: [],
    createdAt: 0,
    updatedAt: 0,
}

const post3 = {
    id: 3,
    message: 'Svelte #ftw',
    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
    board: 'Kryptokrona',
    time: '1651680078',
    nickname: 'Swepool',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    reply: null,
    replies: [],
    createdAt: 0,
    updatedAt: 0,
}

describe('POST API ENDPOINTS', () => {

    // GET ALL LATEST POSTS
    describe(`GET ${process.env.API_BASE_PATH}/v1/posts/latest`, () => {
        it('It should return all latest posts', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/v1/posts/latest`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {

                    expect(response.body.items).to.deep.include(post1)
                    expect(response.body.items).to.deep.include(post2)
                    expect(response.body.items).to.deep.include(post3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ALL POSTS
    describe(`GET ${process.env.API_BASE_PATH}/v1/posts`, () => {
        it('It should return all posts', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/v1/posts`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(post1)
                    expect(response.body.items).to.deep.include(post2)
                    expect(response.body.items).to.deep.include(post3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ALL POSTS QUERY PARAMS
    describe(`GET ${process.env.API_BASE_PATH}/v1/posts/latest?size=3&page=1`, () => {
        it('It should return all posts', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/v1/posts/latest?size=3&page=1`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(post1)
                    expect(response.body.items).to.deep.include(post2)
                    expect(response.body.items).to.deep.include(post3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET POST BY TX HASH
    describe(`GET ${process.env.API_BASE_PATH}/v1/posts/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7`, () => {
        it('It should return 1 post with a specific tx hash', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/v1/posts/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(post1)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET POST BY TX HASH THAT DOESN'T EXIST
    describe(`GET ${process.env.API_BASE_PATH}/v1/posts/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e3`, () => {
        it('It should NOT return 1 post with a specific tx hash', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/v1/posts/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e3`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .then(response => {
                    expect(response.body).to.be.an('object')
                })
        })
    })

})
