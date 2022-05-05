'use strict'

require('dotenv').config()

let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('Post APIs', () => {

    describe(`Test GET route ${process.env.API_BASE_PATH}/posts`, () => {
        it('It should return all latest posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    describe(`Test GET route ${process.env.API_BASE_PATH}/posts/latest`, () => {
        it('It should return all latest posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/latest`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    describe(`Test GET route ${process.env.API_BASE_PATH}/posts/latest?size=10&page=0`, () => {
        it('It should return posts on page 0 with a limit of 10 posts', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/latest?size=10&page=0`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    describe(`Test GET route ${process.env.API_BASE_PATH}/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16`, () => {
        it('It should return a 404 since the tx_hash value does not exist in db', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16`)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    //TODO: add a 200 for tx_hash test with mock data
})