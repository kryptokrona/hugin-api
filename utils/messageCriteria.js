/**
 * Message Criteria module.
 */

'use strict'

require('dotenv').config()

const profanityList = require('../profanity-list.json')
const { getTimestamp } = require('./time')

let log = require('loglevel')

/**
 * Evaluates if a message object is met by criteria.
 *
 * @param {object} message - Message object.
 * @returns {Boolean} criteria - True or false based on the criteria of the config.
 */
module.exports.messageCriteria = (messageObj) => {
    const usersInclude = process.env.SYS_CRITERIA_USERS_INCLUDE
    const usersExclude = process.env.SYS_CRITERIA_USERS_EXCLUDE

    const boardsInclude = process.env.SYS_CRITERIA_BOARDS_INCLUDE
    const boardsExclude = process.env.SYS_CRITERIA_BOARDS_EXCLUDE

    const keywordsInclude = process.env.SYS_CRITERIA_KEYWORDS_INCLUDE
    const keywordsExclude = process.env.SYS_CRITERIA_KEYWORDS_EXCLUDE
    const keywordsCursewords = (process.env.SYS_CRITERIA_KEYWORDS_CURSEWORDS === 'true');    

    // check for curse words
    if (!keywordsCursewords) {
        containsCurseWord(messageObj.message)
    }

    return true
}

/**
 * Checks if the message contains curse words.
 *
 * @param {string} message - Message object.
 * @returns {Boolean} contains curse word - Get boolean if the message contains curse words.
 */
function containsCurseWord(message) {
    // need to split up message into array and check each word
    const messageWords = message.split(' ')
    console.log(messageWords)

    // going through all words in a message and checks against the profanity list
    messageWords.forEach(word => {
        const found = profanityList.find(curseWord => word === curseWord)
        
        if (found !== undefined) {
            log.info(getTimestamp() + ' INFO: Message contains curse word: ' + found)
            return false
        }
    })
    
    return true
}