/**
 * Hugin Syncer.
 */

'use strict'

require('dotenv').config()

let log = require('loglevel')
const { extraDataToMessage } = require('hugin-crypto')
const { performance } = require('perf_hooks')

const { getTimestamp } = require('../utils/time')
const { messageCriteria } = require('../utils/messageCriteria')

let db = require("./postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

let models = require('../database/models')

let known_pool_txs = [];

const { WebSocket } = require('ws');
let ws = new WebSocket(`ws://localhost:8080`);

/**
 * Background sync to fetch data
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
module.exports.backgroundSyncMessages = async () => {
    log.info(getTimestamp() + ' INFO: Background syncing.')
    let message_was_unknown
    
    try {
        const resp = await fetch('http://' + process.env.SYS_HUGIN_NODE_SERVER + '/get_pool_changes_lite', {
            method: 'POST',
            body: JSON.stringify({ knownTxsIds: known_pool_txs })
        })
           
        let json = await resp.json()
        json = JSON.stringify(json)
            .replaceAll('.txPrefix', '')
            .replaceAll('transactionPrefixInfo.txHash', 'transactionPrefixInfotxHash')
        json = JSON.parse(json)

        let transactions = json.addedTxs
        let transaction

        if (transactions.length === 0) {
            log.info(getTimestamp() + ' INFO: Got empty transaction array.')
            return;
        }
        
        for (transaction in transactions) {
            try {
                console.log(transactions[transaction])
                await saveEncryptedPost(transactions[transaction])

                let thisExtra = transactions[transaction].transactionPrefixInfo.extra
                let txHash = transactions[transaction].transactionPrefixInfotxHash

                if (known_pool_txs.indexOf(txHash) === -1) {
                    known_pool_txs.push(txHash)
                    message_was_unknown = true
                } else {
                    message_was_unknown = false
                    console.log("This transaction is already known", txHash)
                    continue
                }

                let knownk =  []
                let keypair = {
                    privateSpendKey: '0000000000000000000000000000000000000000000000000000000000000000',
                    privateViewKey:  '0000000000000000000000000000000000000000000000000000000000000000'
                }

                // if extra is less than 200 length - skip
                let message
                if (thisExtra !== undefined && thisExtra.length > 200) {
                    message = await extraDataToMessage(thisExtra, knownk, keypair)
                }

                if (!message || message === undefined) {
                    log.info(getTimestamp() + ' INFO: Caught undefined null message, continue.')
                    continue
                }

                if ((message || message !== undefined) && (message.brd || message.brd !== undefined)) {
                    log.info(getTimestamp() + ' INFO: Got 1 message. Message: ' + JSON.stringify(message))
                    
                    let messageObj = {
                        message: message.m || null,
                        key: message.k || null,
                        signature: message.s || null,
                        board: message.brd || null,
                        time: message.t || null,
                        nickname: message.n || null,
                        tx_hash: txHash || null,
                        reply: message.r ||null
                    }

                    // skipping based on criteria - if criteria exists
                    const criteriaFulfilled = messageCriteria(messageObj)
                    
                    // criteria guard
                    if (!criteriaFulfilled) {
                        log.info(getTimestamp() + ' INFO: Message does not meet criteria based on configuration: ' + JSON.stringify(message))
                        continue
                    }

                    log.info(getTimestamp() + ' INFO: Criteria fulfilled.')

                    // broadcast message object to websocket server
                    ws.send(JSON.stringify(messageObj))

                    savePost(messageObj, txHash)
                } else {
                    log.info(getTimestamp() + ' INFO: No message.')
                }

            } catch (err) {
                log.error(getTimestamp() + ' ERROR: ' + err)
            }
        }
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
}

/**
 * Check if encrypted post exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
async function encryptedPostExists(txHash) {
    try {
        const postEncryptedTxHashLookup = models.PostEncrypted.findOne({
            where: {
                tx_hash: txHash
            },
            order: [[ 'id', 'DESC' ]],
            raw: true,
        })

        postEncryptedTxHashLookup.then(async result => {
            if (result === null) {
                return false
            }
        })
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
    
    return true
}

/**
 * Check if post exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
async function postExists(txHash) {
    try {
        const postTxHashLookup = models.Post.findOne({
            where: {
                tx_hash: txHash
            },
            order: [[ 'id', 'DESC' ]],
            raw: true,
        })

        postTxHashLookup.then(async result => {
            if (result === null) {
                return false
            }
        })
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
    
    return true
}

/**
 * Save an encrypted post to database.
 *
 * @param {Object} transaction - Transaction object.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function saveEncryptedPost(transaction) {
    const exists = await encryptedPostExists(transaction.transactionPrefixInfotxHash)

    if (!exists) {
        try {
            await sequelize.transaction(async (t) => {
                return models.PostEncrypted.create({
                    tx_hash: transaction.transactionPrefixInfotxHash,
                    tx_extra: transaction.transactionPrefixInfo.extra,
                    tx_unlock_time: transaction.transactionPrefixInfo.unlock_time,
                    tx_version: transaction.transactionPrefixInfo.version
                })
            })
        } catch(err) {
            log.error(getTimestamp() + ' ERROR: ' + err)
        }
    }
}

/**
 * Save a post to database.
 *
 * @param {Object} messageObj - Message object.
 * @param {String} txHash - Hash value.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function savePost(messageObj, txHash) {
    let startTime = performance.now()

    try {
       // checking if post with txHash already exists in db - if not create a new record
        const exists = await postExists(txHash)

        if (!exists) {
            await sequelize.transaction(async (t) => {
                return models.Post.create(messageObj).then(postObj => {
                    log.info(getTimestamp() + ` INFO: Post transaction was successful - Post with ID ${postObj.id} was created.`)
    
                    // extract hashtags from message and save it do db and add relationship in post_hashtag table
                    let messageStr = message.m
                    let hashtags
    
                    try {
                        hashtags = messageStr.match(/#[^\s#\.\;!*€%&()?^$@`¨]*/gmi)
    
                        if (hashtags) {
                            // going through all hashtags and do separate lookups
                            hashtags.forEach(hashtag => {
                                // removing the # and making it lowercase, so we have proper input for query
                                let hashtagName = hashtag.replace('#', '').toLowerCase()
    
                                const hashtagLookup = models.Hashtag.findOne({
                                    where: {
                                        name: hashtagName
                                    },
                                    order: [[ 'id', 'DESC' ]],
                                    raw: true,
                                })
    
                                // create hashtag if it does not exist otherwise get the hashtag ID
                                hashtagLookup.then(async result => {
                                    if (result === null) {
                                        await sequelize.transaction(async (t1) => {
                                            return models.Hashtag.create({
                                                name: hashtagName
                                            }).then(async hashtagObj => {
                                                await sequelize.transaction(async (t2) => {
                                                    return models.PostHashtag.create({
                                                        post_id: postObj.id,
                                                        hashtag_id: hashtagObj.id
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        // hashtag exists, so we add a new row in post_hashtag with its ID
                                        await sequelize.transaction(async (t3) => {
                                            return models.PostHashtag.create({
                                                post_id: postObj.id,
                                                hashtag_id: result.id
                                            })
                                        })
                                    }
                                })
    
                            })
                        }
                    } catch(TypeError)  {
                        log.error(getTimestamp() + ' ERROR: Could not parse hashtags')
                    }
    
                })
            })
        }   

        // calculating queries for debug reasons
        let endTime = performance.now()
        log.info(getTimestamp() + ` INFO: Queries to took ${endTime - startTime} seconds`)

    } catch (err) {
        log.info(getTimestamp() + ' ERROR: An error adding a Post transaction - Rolling back. ' + err)
    }
}