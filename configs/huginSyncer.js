/**
 * Hugin Syncer.
 */

'use strict'

require('dotenv').config()

let log = require('loglevel')
const { extraDataToMessage } = require('hugin-crypto')

const { getTimestamp } = require('../utils/time')
let db = require("./postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

let models = require('../database/models')

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
        const resp = await fetch('http://' + 'blocksum.org:11898' + '/get_pool_changes_lite', {
            method: 'POST',
            body: JSON.stringify({ knownTxsIds: known_pool_txs })
        })

        let json = await resp.json();

        json = JSON.stringify(json)
            .replaceAll('.txPrefix', '')
            .replaceAll('transactionPrefixInfo.txHash', 'transactionPrefixInfotxHash')
        json = JSON.parse(json);

        let transactions = json.addedTxs;
        let transaction;

        if (transactions.length === 0) {
            log.info(getTimestamp() + ' INFO: Got empty transaction array.')
            return;
        }

        for (transaction in transactions) {
            try {
                console.log('tx', transactions[transaction]);
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

                // let msg = JSON.parse(message)

                if (message !== undefined) {
                    log.info(getTimestamp() + ' INFO: Got 1 message.')
                    console.log('Message?', message) //TODO: remove later

                    //TODO: not sure this works
                    /*if (message.t > (Date.now() / 1000) - 604800) {
                        log.info(getTimestamp() + ' INFO: Post is more than 1 week old.')
                        continue
                    }*/

                    try {
                        const postTxHash = models.Post.findOne({
                            where: {
                                tx_hash: thisHash
                            },
                            order: [[ 'id', 'DESC' ]],
                            raw: true,
                        })

                        // checking if post with tx_hash already exists in db - if not create a new record
                        postTxHash.then(async result => {
                            if (result === null) {
                                await sequelize.transaction(async (t) => {

                                    const post = models.Post.create({
                                        message: message.m || null,
                                        key: message.k || null,
                                        signature: message.s || null,
                                        board: message.brd || null,
                                        time: message.t || null,
                                        nickname: message.n || null,
                                        tx_hash: thisHash || null
                                    })

                                    return post;

                                })
                                log.info(getTimestamp() + ' INFO: Post transaction was successful.')
                            } else {
                                log.info(getTimestamp() + ' INFO: Found record in database - Skipping.')
                            }
                        })

                    } catch (error) {
                        log.info(getTimestamp() + ' ERROR: An error adding a Post transaction - Rolling back.')
                    }

                } else {
                    log.info(getTimestamp() + ' INFO: No message.')
                }

            } catch (err) {
                log.error(getTimestamp() + ' ERROR: ' + err)
            }
        }
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error.')
    }
}