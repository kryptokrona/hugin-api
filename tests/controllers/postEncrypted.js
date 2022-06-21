'use strict'

require('dotenv').config()

let server = require('../../server')
let chai = require('chai')
let chaiHttp = require('chai-http')
let request = require('supertest')

const { expect } = chai

chai.should()
chai.use(chaiHttp)

const postEncrypted1 = {
    id: 1,
    tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
    tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
    tx_timestamp: '0',
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
}

const postEncrypted2 = {
    id: 2,
    tx_hash: 'c087967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
    tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
    tx_timestamp: '0',
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
}

const postEncrypted3 = {
    id: 3,
    tx_hash: 'c097967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
    tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
    tx_timestamp: '0',
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
}

describe('POST ENCRYPTED API ENDPOINTS', () => {

    // GET ALL LATEST ENCRYPTED POSTS
    describe(`GET ${process.env.API_BASE_PATH}/posts-encrypted/latest`, () => {
        it('It should return all latest encrypted posts', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/posts-encrypted/latest`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    console.log(response.body.items)
                    expect(response.body.items).to.deep.include(postEncrypted1)
                    expect(response.body.items).to.deep.include(postEncrypted2)
                    expect(response.body.items).to.deep.include(postEncrypted3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ALL ENCRYPTED POSTS
    describe(`GET ${process.env.API_BASE_PATH}/posts-encrypted`, () => {
        it('It should return all encrypted posts', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/posts-encrypted`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(postEncrypted1)
                    expect(response.body.items).to.deep.include(postEncrypted2)
                    expect(response.body.items).to.deep.include(postEncrypted3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ALL ENCRYPTED POSTS QUERY PARAMS
    describe(`GET ${process.env.API_BASE_PATH}/posts-encrypted/latest?size=3&page=0`, () => {
        it('It should return all encrypted posts with params', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/posts-encrypted/latest?size=3&page=0`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(postEncrypted1)
                    expect(response.body.items).to.deep.include(postEncrypted2)
                    expect(response.body.items).to.deep.include(postEncrypted3)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ENCRYPTED POST BY TX HASH
    describe(`GET ${process.env.API_BASE_PATH}/posts-encrypted/c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f`, () => {
        it('It should return 1 encrypted post with a specific tx hash', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/posts-encrypted/c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(postEncrypted1)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET ENCRYPTED POST BY TX HASH THAT DOESN'T EXIST
    describe(`GET ${process.env.API_BASE_PATH}/posts-encrypted/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e3`, () => {
        it('It should NOT return 1 encrypted post with a specific tx hash', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/posts-encrypted/57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e3`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .then(response => {
                    expect(response.body).to.be.an('object')
                })
        })
    })

})