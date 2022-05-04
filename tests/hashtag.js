'use strict'

require('dotenv').config()

let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('Hashtag APIs', () => {

    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/trending`, () => {
        it('It should return all trending hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/trending`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    //TODO: add a successful 200 when trying to get a hashtag that exists, after we fix mock data.

    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/1000`, () => {
        it('It should return a 404 when trying to get a hashtag that does not exist', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/1000`)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags`, () => {
        it('It should return all hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/latest`, () => {
        it('It should return all latest hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/latest`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

})