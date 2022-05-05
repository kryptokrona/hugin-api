'use strict'

require('dotenv').config()

let server = require('../server')
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
    time: 1651680078,
    nickname: 'kryptoknugen',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    created_at: new Date('2022-05-04'),
    updated_at: new Date('2022-05-04'),
}

const post2 = {
    id: 2,
    message: 'Hugin Messenger is freakin awesome',
    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
    board: 'Hugin',
    time: 1651680078,
    nickname: 'mjovanc',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    created_at: new Date('2022-05-05'),
    updated_at: new Date('2022-05-05'),
}

const post3 = {
    id: 3,
    message: 'Svelte #ftw',
    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
    board: 'Kryptokrona',
    time: 1651680078,
    nickname: 'Swepool',
    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
    created_at: new Date('2022-05-05'),
    updated_at: new Date('2022-05-05'),
}

describe('Post APIs', () => {

    // GET ALL LATEST POSTS (EMPTY)
    describe(`Test GET route ${process.env.API_BASE_PATH}/posts/latest`, () => {
        it('It should return all latest posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/latest`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    // GET ALL POSTS (EMPTY)
    describe(`Test GET route ${process.env.API_BASE_PATH}/posts`, () => {
        it('It should return all posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    // GET ALL LATEST POSTS (MOCKUP)
    describe(`Test GET route ${process.env.API_BASE_PATH}/posts`, () => {
        it('It should return 3 posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(response).to.deep.include(post1)
                    expect(response).to.deep.include(post2)
                    expect(response).to.deep.include(post3)
                    
                    response.body.should.be.a('object')
                })
            done()
        })
    })

    // GET ALL POSTS QUERY PARAMS (EMPTY)
    /* describe(`Test GET route ${process.env.API_BASE_PATH}/posts/latest?size=10&page=0`, () => {
        it('It should return posts on page 0 with a limit of 10 posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/latest?size=10&page=0`)
                .end((err, response) => {
                    // expect(response.status).to.equal(200)
                    // response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    }) */

    // GET POST BY TX HASH (EMPTY)
    /* describe(`Test GET route ${process.env.API_BASE_PATH}/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16`, () => {
        it('It should return a 404 since the tx_hash value does not exist in db', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16`)
                .end((err, response) => {
                    // response.should.have.status(404)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    }) */

    // GET POST BY TX HASH (MOCKUP)
    //TODO: add a successful 200 when trying to get a hashtag that exists, after we fix mock data.
    
})