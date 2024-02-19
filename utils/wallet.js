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
 * Wallet module.
 */

const WB = require('kryptokrona-wallet-backend-js')
const files = require('fs/promises')
const log = require('loglevel')
const { Crypto } = require('kryptokrona-utils')
const crypto = new Crypto()

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

    await sleep(90 * 1000)

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
    } catch (err) {
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
    } catch (err) {
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

async function optimizeMessages(wallet, nbrOfTxs, fee = 10000, attempt = 0) {
    if (attempt > 10) {
        return false
    }
    if (wallet.getAddresses().length === 1) {
        const [spendKey, viewKey] = wallet.getPrimaryAddressPrivateKeys()
        const subWalletKeys = await crypto.generateDeterministicSubwalletKeys(spendKey, 1)
        await wallet.importSubWallet(subWalletKeys.private_key)
    }

    const [walletHeight, localHeight, networkHeight] = wallet.getSyncStatus()

    let inputs = await wallet.subWallets.getSpendableTransactionInputs(wallet.getAddresses()[1], networkHeight)

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
            wallet.subWallets.getAddresses()[1],
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

const fetchNodes = async () => {
    const uri = 'https://raw.githubusercontent.com/kryptokrona/kryptokrona-public-nodes/main/nodes.json'
    try {
    const response = await fetch(uri)
    const result = await response.json()
    return result.nodes
    
    } catch (e) {
        console.log("Error fetching nodes")
        return false
    }
}

const getBestNode = async (ssl=true) => {

    let recommended_node = undefined;
    const nodes = await fetchNodes()
    if (!nodes) return [false, 0]
    let node_requests = [];
    let ssl_nodes =[];
    if (ssl) {
        ssl_nodes = nodes.filter(node => {return node.ssl});
    } else {
        ssl_nodes =  nodes.filter(node => {return !node.ssl});
    }
  
    ssl_nodes = ssl_nodes.sort((a, b) => 0.5 - Math.random());
  
    console.log(ssl_nodes);
  
    let i = 0;
  
    while (i < ssl_nodes.length) {
  
  
      let this_node = ssl_nodes[i];
  
      let nodeURL = `${this_node.ssl ? 'https://' : 'http://'}${this_node.url}:${this_node.port}/info`;
      try {
        const resp = await fetch(nodeURL, {
          method: 'GET',
        }, 2000);
  
      if (resp.ok) {
  
        recommended_node = [this_node.url, this_node.port];
        console.log("resp ok!", recommended_node)
        return recommended_node;
      }
    } catch (e) {
      console.log(e);
    }
    i++;
    }
    
    return false
  
    }

module.exports = {
    openWallet,
    saveWallet,
    optimizeMessages,
    getBestNode
}
