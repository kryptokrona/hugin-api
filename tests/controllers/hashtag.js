'use strict'

require('dotenv').config()

let server = require('../../server')
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

const trendingHashtag1 = {
    id: 1,
    name: 'kryptokrona',
    posts: 2,
}

const trendingHashtag2 = {
    id: 2,
    name: 'hugin',
    posts: 1,
}

const trendingHashtag3 = {
    id: 3,
    name: 'crypto',
    posts: 1,
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
                    expect(response.body).to.be.an('object')
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
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // TODO: not working atm
    // GET ALL TRENDING HASHTAGS
    describe(`GET ${process.env.API_BASE_PATH}/hashtags/trending`, () => {
        it('It should return all trending hashtags', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/trending`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    // expect(response.body.items).to.deep.include(trendingHashtag1)
                    // expect(response.body.items).to.deep.include(trendingHashtag2)
                    // expect(response.body.items).to.deep.include(trendingHashtag3)
                    expect(response.body).to.be.an('object')

                    // asserts
                    // assert that a trending hashtag do not have 0 posts or less
                })
        })
    })

    // GET HASHTAG BY ID
    describe(`GET ${process.env.API_BASE_PATH}/hashtags/1`, () => {
        it('It should return a hashtag with ID of 1', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/1`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.include(hashtag1)
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET HASHTAG BY ID THAT DOESN'T EXIST
    describe(`GET ${process.env.API_BASE_PATH}/hashtags/1000`, () => {
        it('It should not return a hashtag', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags/1000`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .then(response => {
                    expect(response.body).to.be.an('object')
                })
        })
    })

    // GET HASHTAG BY SEARCH QUERY PARAMETERS
    describe(`GET ${process.env.API_BASE_PATH}/hashtags?search=krona`, () => {
        it('It should return a hashtag with name kryptokrona', async () => {
            return request(server)
                .get(`${process.env.API_BASE_PATH}/hashtags?search=krona`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.items).to.deep.include(hashtag1)
                    expect(response.body).to.be.an('object')
                    expect(response.body.items).to.be.an('array')
                })
        })
    })

})