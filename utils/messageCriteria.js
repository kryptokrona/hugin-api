/**
 * Message Criteria module.
 */

'use strict'

require('dotenv').config()
const profanityList = require('../profanity-list.json')
let log = require('loglevel')

/**
 * Evaluates if a message object is met by criteria.
 *
 * @param {object} message - Message object.
 * @returns {Boolean} criteria - True or false based on the criteria of the config.
 */
module.exports.messageCriteria = (messageObj) => {
    usersInclude = process.env.SYS_CRITERIA_USERS_INCLUDE
    usersExclude = process.env.SYS_CRITERIA_USERS_EXCLUDE

    boardsInclude = process.env.SYS_CRITERIA_BOARDS_INCLUDE
    boardsExclude = process.env.SYS_CRITERIA_BOARDS_EXCLUDE

    keywordsInclude = process.env.SYS_CRITERIA_KEYWORDS_INCLUDE
    keywordsExclude = process.env.SYS_CRITERIA_KEYWORDS_EXCLUDE
    keywordsCursewords = process.env.SYS_CRITERIA_KEYWORDS_CURSEWORDS

    // check for curse words
    if (!keywordsCursewords) {
        found = profanityList.find(word => messageObj.message === word)
        if (found) return false
    }

    return true
}