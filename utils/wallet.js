// Copyright (c) 2022-2022, The Kryptokrona Project
//
// Written by Marcus Cvjeticanin
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
 * Wallet module.
 */

const WB = require('kryptokrona-wallet-backend-js')
const files = require('fs/promises')
const log = require('loglevel')

let db = require("../configs/postgresql"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize

let models = require('../database/models')

const { getTimestamp, sleep } = require('./time')

/**
 * Open a wallet
 *
 * @returns {String}
 */
async function openWallet(daemon) {
    log.info(getTimestamp() + ' INFO: Open wallet...')
    const walletExists = await walletExistsInDb()

    if (walletExists) {
        log.info(getTimestamp() + ' INFO: Wallet found, loading...')
        
        const json_wallet = await getWalletFromDb()
        const jsonWalletFromDb = JSON.stringify(
            JSON.parse(json_wallet[0].encrypted_wallet)
        )
        
        const [wallet, error] = await WB.WalletBackend.openWalletFromEncryptedString(daemon, jsonWalletFromDb, 'hugin')
        
        return wallet
    }

    log.info(getTimestamp() + ' INFO: No wallet found, creating a new one...')
    const newWallet = await WB.WalletBackend.createWallet(daemon)
    
    return newWallet
}

/**
 * Save a wallet
 *
 * @returns {String}
 */
async function saveWallet(wallet) {
    const encrypted_wallet = await wallet.encryptWalletToString('hugin')
    const mnemonicSeed = await wallet.getMnemonicSeed()
    const walletExists = await walletExistsInDb();

    if (!walletExists) {
        log.info(getTimestamp() + ' INFO: Wallet does not exist. Creating and saving wallet to db...')
        await saveWalletToDb(encrypted_wallet, mnemonicSeed.toString())
    }

    await sleep(90*1000)
    
    try {
        saveWallet(wallet)
    } catch (err) {
        console.log(err)
        log.error('Error while saving wallet during interval.')
    }
}

/**
 * Save the wallet to db
 *
 * @param {String} encryptedStr - Encrypted String
 * @param {String} mnemonicSeed - Mnemonic Seed
 * @returns {Boolean} Resolves to true if found.
 */
async function saveWalletToDb(encryptedStr, mnemonicSeed) {
    try {
        await sequelize.transaction(async (t) => {
          return models.Wallet.create({
            encrypted_wallet: encryptedStr,
            mnemonic_seed: mnemonicSeed
          })
        })
    } catch(err) {
        log.error(getTimestamp() + ' ERROR: ' + err)
    }
}

/**
 * Get wallet from db
 *
 * @returns {Boolean} Resolves to true if found.
 */
 async function getWalletFromDb() {
    try {
        const walletLookup = models.Wallet.findAll({
            raw: true
        })
        return walletLookup
    } catch(err) {
        log.error(getTimestamp() + ' ERROR: ' + err)
    }
}

/**
 * Check if wallet exists in database.
 *
 * @returns {Boolean} Resolves to true if found.
 */
 async function walletExistsInDb() {
    try {
        const walletLookup = await models.Wallet.findAndCountAll({
            raw: true
        })

        return walletLookup.count > 0
    } catch (err) {
        log.error(getTimestamp() + ' ERROR: Sync error. ' + err)
    }
}

async function optimizeMessages(nbrOfTxs, fee = 10000, attempt = 0) {
    if (attempt > 10) {
        return false
    }

    const [walletHeight, localHeight, networkHeight] = wallet.getSyncStatus()

    let inputs = await wallet.subWallets.getSpendableTransactionInputs(wallet.subWallets.getAddresses(), networkHeight)

    if (inputs.length > 8) {
        return inputs.length
    }

    let subWallets = wallet.subWallets.subWallets

    subWallets.forEach((value, name) => {
        let txs = value.unconfirmedIncomingAmounts.length

        if (txs > 0) {
            return txs
        }
    })

    let payments = []
    let i = 0

    /* User payment */
    while (i < nbrOfTxs - 1 && i < 10) {
        payments.push([
            wallet.subWallets.getAddresses()[0],
            2000
        ])

        i += 1

    }

    await wallet.sendTransactionAdvanced(
        payments, // destinations,
        3, // mixin
        { fixedFee: 1000, isFixedFee: true }, // fee
        undefined, //paymentID
        undefined, // subWalletsToTakeFrom
        undefined, // changeAddress
        true, // relayToNetwork
        false, // sneedAll
        undefined
    )

    return true
}

module.exports = {
    openWallet,
    saveWallet,
    optimizeMessages
}