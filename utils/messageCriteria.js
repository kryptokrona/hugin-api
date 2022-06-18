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
    let criteriaUsersInclude = true
    let criteriaUsersExclude = true
    let criteriaBoardsInclude = true
    let criteriaBoardsExclude = true
    let criteriaKeywordsInclude = true
    let criteriaKeywordsExclude = true
    let curseWord = false
    
    // check for users to include
    if (usersInclude.length > 0) {
        const lookup = usersInclude.split(' ').some(user => messageObj.nickname === user)
        console.log('usersInclude: ' + lookup)

        if (lookup) {
            criteriaUsersInclude = true
        } else {
            criteriaUsersInclude = false
        }
    }

    // check for users to exclude
    if (usersExclude.length > 0) {
        const lookup = usersExclude.split(' ').some(user => messageObj.nickname === user)
        console.log('usersExclude: ' + lookup)

        if (lookup) {
            criteriaUsersExclude = true
        } else {
            criteriaUsersExclude = false
        }
    }

    // check for boards to include
    if (boardsInclude.length > 0) {
        const lookup = boardsInclude.split(' ').some(board => messageObj.board === board)
        console.log('boardsInclude: ' + lookup)

        if (lookup) {
            criteriaBoardsInclude = true
        } else {
            criteriaBoardsInclude = false
        }
    }

    // check for boards to exclude
    if (boardsExclude.length > 0) {
        const lookup = boardsExclude.split(' ').some(board => messageObj.board === board)
        console.log('boardsExclude: ' + lookup)

        if (lookup) {
            criteriaBoardsExclude = false
        } else {
            criteriaBoardsExclude = true
        }
    }

    // check for keywords to include
    if (keywordsInclude.length > 0) {
        const keywordsInMessage = messageObj.message.split(' ')
        
        criteriaKeywordsInclude = keywordsInclude.split(' ').some(keywordToInclude => {
            const lookup = keywordsInMessage.some(keyword => keywordToInclude === keyword)
            console.log('keywordsInclude: ' + lookup)

            if (lookup) {
                return true
            } else {
                return false
            }
        })
    }

    // check for keywords to exclude
    if (keywordsExclude.length > 0) {
        const keywordsInMessage = messageObj.message.split(' ')
        
        criteriaKeywordsExclude = keywordsExclude.split(' ').some(keywordToExclude => {
            const lookup = keywordsInMessage.some(keyword => keywordToExclude === keyword)
            console.log('keywordsExclude: ' + lookup)

            if (lookup) {
                return false
            } else {
                return true
            }
        })
    }

    // check for curse words
    if (!keywordsCurseWords) {
        curseWord = noCurseWord(messageObj.message)
    }

    // all checks if the message should go through or not
    if (!curseWord) {
        return false
    } else {
        console.log('criteriaUsersInclude: ' + criteriaUsersInclude)
        console.log('criteriaUsersExclude: ' + criteriaUsersExclude)
        console.log('criteriaBoardsInclude: ' + criteriaBoardsInclude)
        console.log('criteriaBoardsExclude: ' + criteriaBoardsExclude)
        console.log('criteriaKeywordsInclude: ' + criteriaKeywordsInclude)
        console.log('criteriaKeywordsExclude: ' + criteriaKeywordsExclude)
        
        if (
            criteriaUsersInclude    && 
            criteriaUsersExclude    && 
            criteriaBoardsInclude   && 
            criteriaBoardsExclude   &&
            criteriaKeywordsInclude && 
            criteriaKeywordsExclude
        ) {
            return true
        } else {
            return false
        }
    }
}

/**
 * Checks if the message contains curse words.
 *
 * @param {string} message - Message string.
 * @returns {Boolean} contains curse word - Get boolean if the message contains curse words.
 */
function noCurseWord(message) {
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