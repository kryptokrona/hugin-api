'use strict'

require('dotenv').config()

let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')
let request = require('supertest')
let assert = require('assert')

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

describe('HASHTAG API ENDPOINTS', () => {

    // GET ALL LATEST HASHTAGS
    describe(`GET ${process.env.API_BASE_PATH}/hashtags/latest`, () => {
        it('It should return the latest hashtags', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/latest`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(hashtag1)
                    expect(response.body.items).to.deep.include(hashtag2)
                    expect(response.body.items).to.deep.include(hashtag3)
                })
        })
    })

    // GET ALL HASHTAGS
    describe(`GET ${process.env.API_BASE_PATH}/hashtags`, () => {
        it('It should return all hashtags', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(hashtag1)
                    expect(response.body.items).to.deep.include(hashtag2)
                    expect(response.body.items).to.deep.include(hashtag3)
                })
        })
    })

    // GET ALL TRENDING HASHTAGS (DO NOT WORK)
    /* describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/trending`, () => {
        it('It should return trending hashtags', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/trending`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(response).to.deep.include(hashtag1)
                    expect(response).to.deep.include(hashtag2)
                    expect(response).to.deep.include(hashtag3)
                    
                    response.body.should.be.a('object')
                })
            done()
        })
    }) */

    // GET HASHTAG BY ID
    /* describe(`Test GET route ${process.env.API_BASE_PATH}/hashtags/1`, () => {
        it('It should return a hashtag with specific ID', (done) => {
            chai.request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/1`)
                .end((err, response) => {
                    expect(response.status).to.equal(200)
                    expect(response).to.deep.include(hashtag1)
                    
                    response.body.should.be.a('object')
                })
            done()
        })
    }) */

    // GET HASHTAG BY NAME (NOT CURRENTLY IMPLEMENTED)

})