/**
 * Hugin Syncer.
 */

'use strict'

import { Transaction } from "sequelize"

require('dotenv').config()

let log = require('loglevel')
const { extraDataToMessage } = require('hugin-crypto')
const { performance } = require('perf_hooks')
const { WebSocket } = require('ws')
let ws = new WebSocket(`ws://localhost:${process.env.SYS_WS_PORT}`)

const { getTimestamp } = require('../utils/time')
const { messageCriteria } = require('../utils/messageCriteria')
const { validateMessage } = require('../validators/messageValidator')
let avatar = require('../utils/avatar')

let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

let models = require('../database/models')
const {logger} = require("sequelize/lib/utils/logger");

let known_pool_txs: any = [];

/**
 * Background sync to fetch data
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
async function backgroundSyncMessages() {
    log.info(getTimestamp() + ' INFO: Background syncing.')
    let message_was_unknown

    try {
        const resp = await fetch('http://' + process.env.SYS_HUGIN_NODE_SERVER + '/get_pool_changes_lite', {
            method: 'POST',
            body: JSON.stringify({ knownTxsIds: known_pool_txs })
        })

        let json = await resp.json()
        json = JSON.stringify(json)
            .replace('.txPrefix', '')
            .replace('transactionPrefixInfo.txHash', 'transactionPrefixInfotxHash')
        json = JSON.parse(json)

        let transactions = json.addedTxs
        let transaction

        if (transactions.length === 0) {
            log.info(getTimestamp() + ' INFO: Got empty transaction array.')
            return;
        }

        for (transaction in transactions) {
            try {
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

                let knownk: any = []
                let keypair = {
                    privateSpendKey: '0000000000000000000000000000000000000000000000000000000000000000',
                    privateViewKey:  '0000000000000000000000000000000000000000000000000000000000000000'
                }

                // if extra is less than 200 length - skip
                let message
                if (thisExtra !== undefined && thisExtra.length > 200) {
                    const boxObj = JSON.parse(trimExtra(thisExtra))

                    // make sure that box exists before adding an encrypted post to db
                    if (boxObj.box) {
                        // checking if encrypted post with txHash already exists in db - if not create a new record
                        encryptedPostExists(txHash).then(result => {
                            if (result === null) {
                                saveEncryptedPost(txHash, boxObj)
                            }
                        })
                    }

                  if (boxObj.sb) {
                      // checking if encrypted group post with txHash already exists in db - if not create a new record
                      encryptedGroupPostExists(txHash).then(result => {
                        if (result === null) {
                          saveEncryptedGroupPost(txHash, boxObj)
                        }
                      })
                  }

                  message = await extraDataToMessage(thisExtra, knownk, keypair)
                }

                if (!message) {
                    log.info(getTimestamp() + ' INFO: Caught undefined null message, continue.')
                    continue
                }

                if ((message || true) && (message.brd || message.brd !== undefined)) {
                    log.info(getTimestamp() + ' INFO: Got 1 message. Message: ' + JSON.stringify(message))

                    let avatarStr = avatar.generate(message.k)

                    let messageObj = {
                        message: message.m || null,
                        key: message.k || null,
                        signature: message.s || null,
                        board: message.brd || null,
                        time: message.t || null,
                        nickname: message.n || null,
                        tx_hash: txHash || null,
                        reply: message.r || null,
                        avatar: avatarStr || null,
                    }

                    const messageValidated = validateMessage(messageObj)

                    if (messageValidated) {
                      log.info(getTimestamp() + ' INFO: Message was validated.')
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

                      // checking if post with txHash already exists in db - if not create a new record
                      postExists(txHash).then(result => {
                        if (result === null) {
                          savePost(messageObj, txHash)
                        }
                      })
                    } else {
                      log.info(getTimestamp() + ' INFO: Message was not validated, ignoring.')
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
 * Check if encrypted post exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
async function encryptedPostExists(txHash: string) {
    try {
        const postEncryptedTxHashLookup = models.PostEncrypted.findOne({
            where: {
                tx_hash: txHash
            },
            order: [[ 'id', 'DESC' ]],
            raw: true,
        })

        return postEncryptedTxHashLookup
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
}

/**
 * Check if encrypted group post exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
async function encryptedGroupPostExists(txHash: string) {
  try {
    const postEncryptedGroupTxHashLookup = models.PostEncryptedGroup.findOne({
      where: {
        tx_hash: txHash
      },
      order: [[ 'id', 'DESC' ]],
      raw: true,
    })

    return postEncryptedGroupTxHashLookup
  } catch (err) {
    log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
  }
}

/**
 * Check if post exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
async function postExists(txHash: string) {
    try {
        const postTxHashLookup = models.Post.findOne({
            where: {
                tx_hash: txHash
            },
            order: [[ 'id', 'DESC' ]],
            raw: true,
        })

        return postTxHashLookup
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
}

/**
 * Save an encrypted post to database.
 *
 * @param {String} txHash - Transaction Hash Value.
 * @param {Object} boxObj - Box Object.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function saveEncryptedPost(txHash: string, boxObj: any) {
    try {
        await sequelize.transaction(async (t: Transaction) => {
            return models.PostEncrypted.create({
                tx_hash: txHash,
                tx_box: boxObj.box,
                tx_timestamp: boxObj.t.toString(),
            })
        })
    } catch(err) {
        log.error(getTimestamp() + ' ERROR: ' + err)
    }
}

/**
 * Save an encrypted group post to database.
 *
 * @param {String} txHash - Transaction Hash Value.
 * @param {Object} boxObj - Box Object.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function saveEncryptedGroupPost(txHash: string, boxObj: any) {
  try {
    await sequelize.transaction(async (t: Transaction) => {
      return models.PostEncryptedGroup.create({
        tx_hash: txHash,
        tx_sb: boxObj.sb,
        tx_timestamp: boxObj.t.toString(),
      })
    })
  } catch(err) {
    log.error(getTimestamp() + ' ERROR: ' + err)
  }
}

/**
 * Save a post to database.
 *
 * @param {Object} messageObj - Message object.
 * @param {String} txHash - Hash value.
 * @returns {Promise} Resolves to this if transaction to database succeeded.
 */
async function savePost(messageObj: any, txHash: string) {
    let startTime = performance.now()

    try {
        await sequelize.transaction(async (t: Transaction) => {
            return models.Post.create(messageObj).then((postObj: any) => {
                log.info(getTimestamp() + ` INFO: Post transaction was successful - Post with ID ${postObj.id} was created.`)

                // extract hashtags from message and save it do db and add relationship in post_hashtag table
                let messageStr = messageObj.message

                try {
                    // break down message to a list of hashtags (if text starts with #)
                    let hashtags = messageStr.match(/#[^\s#\.\;!*€%&()?^$@`¨]*/gmi)

                    if (hashtags) {
                        // going through all hashtags and do separate lookups
                        hashtags.forEach((hashtag: string) => {
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
                            hashtagLookup.then(async (result: any) => {
                                if (result === null) {
                                    await sequelize.transaction(async (t1: Transaction) => {
                                        return models.Hashtag.create({
                                            name: hashtagName
                                        }).then(async (hashtagObj: any) => {
                                            await sequelize.transaction(async (t2: Transaction) => {
                                                return models.PostHashtag.create({
                                                    post_id: postObj.id,
                                                    hashtag_id: hashtagObj.id
                                                })
                                            })
                                        })
                                    })
                                } else {
                                    // hashtag exists, so we add a new row in post_hashtag with its ID
                                    await sequelize.transaction(async (t3: Transaction) => {
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

        // calculating queries for debug reasons
        let endTime = performance.now()
        log.info(getTimestamp() + ` INFO: Queries to took ${endTime - startTime} seconds`)

    } catch (err) {
        log.error(getTimestamp() + ' ERROR: An error adding a Post transaction - Rolling back. ' + err)
    }
}

/**
 * Converts hex value to string.
 *
 * @param {String} hex - Hex value.
 * @param {String} str - String value.
 * @returns {String} Returns .
 */
function fromHex(hex: string, str?: string) {
    try{
        str = decodeURIComponent(hex.replace(/(..)/g,'%$1'))
    } catch (e) {
        str = hex
        log.error(getTimestamp() + ' ERROR: Invalid hex input. ' + e)
    }
    return str
}

/**
 * Trim extra data to Box object.
 *
 * @param {String} extra - Extra data.
 * @returns {String} Returns extra data to Box.
 */
function trimExtra(extra: string) {
    // Extra data contains either a 66 or 78 prefix that isn't used for messages
    try {
        // Transaction from kryptokrona-service
        let payload = fromHex(extra.substring(66))
        let payload_json = JSON.parse(payload)
        return fromHex(extra.substring(66))
    } catch (e) {
        // Transaction from kryptokrona-wallet-backend-js
        return fromHex(Buffer.from(extra.substring(78)).toString())
    }
}

export default backgroundSyncMessages;