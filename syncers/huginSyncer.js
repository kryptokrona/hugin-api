// Copyright (c) 2022-2023, The Kryptokrona Project
//
// Created by Marcus Cvjeticanin
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Hugin Syncer.
 */

'use strict'

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
const { logger } = require("sequelize/lib/utils/logger");

let known_pool_txs = [];

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

        known_pool_txs = known_pool_txs.filter((n) => !json.deletedTxsIds.includes(n))

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

                let knownk = []
                let keypair = {
                    privateSpendKey: '0000000000000000000000000000000000000000000000000000000000000000',
                    privateViewKey: '0000000000000000000000000000000000000000000000000000000000000000'
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
            order: [['id', 'DESC']],
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
async function encryptedGroupPostExists(txHash) {
    try {
        const postEncryptedGroupTxHashLookup = models.PostEncryptedGroup.findOne({
            where: {
                tx_hash: txHash
            },
            order: [['id', 'DESC']],
            raw: true,
        })

        return postEncryptedGroupTxHashLookup
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
async function saveEncryptedPost(txHash, boxObj) {
    try {
        await sequelize.transaction(async (t) => {
            return models.PostEncrypted.create({
                tx_hash: txHash,
                tx_box: boxObj.box,
                tx_timestamp: boxObj.t.toString(),
            })
        })
    } catch (err) {
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
async function saveEncryptedGroupPost(txHash, boxObj) {
    try {
        await sequelize.transaction(async (t) => {
            return models.PostEncryptedGroup.create({
                tx_hash: txHash,
                tx_sb: boxObj.sb,
                tx_timestamp: boxObj.t.toString(),
            })
        })
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: ' + err)
    }
}


/**
 * Converts hex value to string.
 *
 * @param {String} hex - Hex value.
 * @param {String} str - String value.
 * @returns {String} Returns .
 */
function fromHex(hex, str) {
    try {
        str = decodeURIComponent(hex.replace(/(..)/g, '%$1'))
    } catch (e) {
        str = hex
        log.error(getTimestamp() + ' ERROR: Invalid hex input. ' + err)
    }
    return str
}

/**
 * Trim extra data to Box object.
 *
 * @param {String} extra - Extra data.
 * @returns {String} Returns extra data to Box.
 */
function trimExtra(extra) {
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
