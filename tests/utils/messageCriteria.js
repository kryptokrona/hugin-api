'use strict'

require('dotenv').config()

let chai = require('chai')
let chaiHttp = require('chai-http')
let assert = require('assert')
const { messageCriteria } = require('../../utils/messageCriteria')

chai.should()
chai.use(chaiHttp)


describe('MESSAGE CRITERIA', () => {

    // CHECK MESSAGE CRITERIA 1
    describe(`Message criteria 1`, () => {
        it('Criteria should be fulfilled', async () => {
            let messageObj = {
                message: 'hej',
                key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
                signature: '63397036af2d08dd9a979bce71409ebed2df5dfdd98e99c31652321afdb8d20431f8139b5798cec9fd60287c7c99c7b77382698511be211a89118862ae895707',
                board: 'softwaredevs',
                time: 1655579120,
                nickname: 'bolibompadraken',
                tx_hash: '1431829de4f64454342620da4897cc384fda07a6e53d8cb109d3720014f330a4',
                reply: null
            }

            const actualCriteriaFulfilled = messageCriteria(messageObj)
            
            assert.equal(actualCriteriaFulfilled, true)
        })
    })

})