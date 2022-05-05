'use strict'

require('dotenv').config()

let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')
let request = require('supertest')

const { expect } = chai

chai.should()
chai.use(chaiHttp)

const hashtag1 = {
    id: 1,
    name: 'kryptokrona',
}

const hashtag2 = {
    id: 2,
    name: 'hugin',
}

const hashtag3 = {
    id: 3,
    name: 'crypto',
}

describe('Hashtag APIs', () => {

    // GET ALL HASHTAGS (MOCKUP)
    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags`, () => {
        it('It should return 3 hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(response).to.deep.include(hashtag1)
                    expect(response).to.deep.include(hashtag2)
                    expect(response).to.deep.include(hashtag3)
                    
                    response.body.should.be.a('object')
                })
            done()
        })
    })

    // GET ALL TRENDING HASHTAGS (EMPTY)
    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/trending`, () => {
        it('It should return all trending hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/trending`)
                .end((err, response) => {
                    console.log(response)
                    // response.status.should.have.status(200)
                    // response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    // GET ALL LATEST HASHTAGS (EMPTY)
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

    // GET ALL HASHTAGS (EMPTY)
    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags`, () => {
        it('It should return empty object', (done) => {
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

    // GET HASHTAG BY ID (EMPTY)
    describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/1000`, () => {
        it('It should return a 404 when trying to get a hashtag that does not exist', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/1000`)
                .end((err, response) => {
                    response.should.have.status(404)
                    // response.body.should.be.a('object')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })

    // NOT DONE
    //TODO: add a successful 200 when trying to get a hashtag that exists, after we fix mock data.
    

})