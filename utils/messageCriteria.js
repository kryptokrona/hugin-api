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
    // load data from environment variables
    const usersInclude = process.env.SYS_CRITERIA_USERS_INCLUDE
    const usersExclude = process.env.SYS_CRITERIA_USERS_EXCLUDE

    const boardsInclude = process.env.SYS_CRITERIA_BOARDS_INCLUDE
    const boardsExclude = process.env.SYS_CRITERIA_BOARDS_EXCLUDE

    const keywordsInclude = process.env.SYS_CRITERIA_KEYWORDS_INCLUDE
    const keywordsExclude = process.env.SYS_CRITERIA_KEYWORDS_EXCLUDE
    const keywordsCurseWords = (process.env.SYS_CRITERIA_KEYWORDS_CURSEWORDS === 'true');

    // initial values
    let hasUsersInclude = false
    let hasUsersExclude = false
    let hasBoardsInclude = false
    let hasBoardsExclude = false
    let hasKeywordsInclude = false
    let hasKeywordsExclude = false
    let hasCurseWord = false
    
    // check for users to include
    if (usersInclude.length > 0) {
        hasUsersInclude = contains(usersInclude.split(' '), messageObj.nickname)
    }

    // check for users to exclude
    if (usersExclude.length > 0) {
        hasUsersExclude = usersExclude.split(' ').some(user => messageObj.nickname === user)
    }

    // check for boards to include
    if (boardsInclude.length > 0) {
        hasBoardsInclude = contains(boardsInclude.split(' '), messageObj.board)
    }

    // check for boards to exclude
    if (boardsExclude.length > 0) {
        hasBoardsExclude = boardsExclude.split(' ').some(board => messageObj.board === board)
    }

    // check for keywords to include
    if (keywordsInclude.length > 0) {
        hasKeywordsInclude = contains(keywordsInclude.split(' '), messageObj.message)
    }

    // check for keywords to exclude
    if (keywordsExclude.length > 0) {
        hasKeywordsExclude = contains(keywordsExclude.split(' '), messageObj.message)
    }

    // check for curse words
    if (!keywordsCurseWords) {
        hasCurseWord = containsCurseWord(messageObj.message)
    }

    // all checks if the message should go through or not
    if (hasCurseWord) {
        console.log('has curse word')
        return false
    } else {
        if ( 
            ( (hasUsersInclude    || hasUsersExclude)        &&       (hasUsersInclude    != hasUsersExclude) )        &&
            ( (hasBoardsInclude   || hasBoardsExclude)       &&       (hasBoardsInclude   != hasBoardsExclude) )       &&
            ( (hasKeywordsInclude || hasKeywordsExclude)     &&       (hasKeywordsInclude != hasKeywordsExclude) )
        ) {
            return true
        } else {
            return false
        }
    }
}

/**
 * Checks if item contains in list.
 *
 * @params {array} list - Array of items.
 * @param {string} item - String item.
 * @returns {Boolean} contains item - Get boolean if the item contains in list.
 */
function contains(list, item) {
    return list.some(i => item === i)
}

/**
 * Checks if the message contains curse words.
 *
 * @param {string} message - Message string.
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
            return true
        }
    })
    
    return false
}