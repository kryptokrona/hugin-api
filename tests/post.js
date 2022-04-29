let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('Post APIs', () => {

    /*describe('Test GET route /api/v1/posts', () => {
        it('It should return all latest posts', (done) => {
            chai.request(server)
                .get('/api/v1/posts/latest')
                .end((err, response) => {
                    response.should.have.status(200)
                    // response.body.should.be.a('array')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })*/

    /*describe('Test GET route /api/v1/posts/trending', () => {
        it('It should return all trending posts', (done) => {
            chai.request(server)
                .get('/api/v1/posts/trending')
                .end((err, response) => {
                    response.should.have.status(200)
                    // response.body.should.be.a('array')
                    // response.body.length.should.not.be.eq(0) // uncomment this later when we have actual data to get back from DB
                })
            done()
        })
    })*/
})