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
                let thisHash = transactions[transaction].transactionPrefixInfotxHash

                if (known_pool_txs.indexOf(thisHash) === -1) {
                    known_pool_txs.push(thisHash)
                    message_was_unknown = true
                } else {
                    message_was_unknown = false
                    console.log("This transaction is already known", thisHash)
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
                        tx_hash: thisHash || null,
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

                    let startTime = performance.now()

                    try {
                        // database lookup if row exists with a certain tx_hash
                        const postTxHashLookup = models.Post.findOne({
                            where: {
                                tx_hash: thisHash
                            },
                            order: [[ 'id', 'DESC' ]],
                            raw: true,
                        })

                        // checking if post with tx_hash already exists in db - if not create a new record
                        postTxHashLookup.then(async result => {
                            if (result === null) {
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
                            } else {
                                log.info(getTimestamp() + ' INFO: Found record in database - Skipping.')
                            }
                        })

                        // calculating queries for debug reasons
                        let endTime = performance.now()
                        log.info(getTimestamp() + ` INFO: Queries to took ${endTime - startTime} seconds`)

                    } catch (err) {
                        log.info(getTimestamp() + ' ERROR: An error adding a Post transaction - Rolling back. ' + err)
                    }

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
 * Save an encrypted post to database.
 *
 * @param {Object} transaction - Transaction object.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function saveEncryptedPost(transaction) {
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

/**
 * Save a post to database.
 *
 * @param {Object} message - Message object.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function savePost(message) {
    console.log(message)
}