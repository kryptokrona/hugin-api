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

const { getTimestamp } = require('./time')

/**
 * Open a wallet
 *
 * @returns {String}
 */
async function openWallet(daemon) {
    log.info(getTimestamp() + ' INFO: Open wallet...')

    try {
        const json_wallet = await files.readFile("wallet.json")
        const [wallet, error] = await WB.WalletBackend.openWalletFromEncryptedString(daemon, JSON.parse(json_wallet), 'hugin')
        log.info(getTimestamp() + ' INFO: Wallet found, loading...')
        
        return wallet
    } catch (err) {
        log.info(getTimestamp() + ' INFO: No wallet found, creating a new one...')
        const newWallet = await WB.WalletBackend.createWallet(daemon)
        const mnemonicSeed = await newWallet.getMnemonicSeed()
        await files.writeFile(`mnemonic-${newWallet.getPrimaryAddress()}.txt`, JSON.stringify(mnemonicSeed))
        
        return newWallet
    }
}

/**
 * Save a wallet
 *
 * @returns {String}
 */
async function saveWallet(wallet) {
    const encrypted_wallet = await wallet.encryptWalletToString('hugin')
    await files.writeFile("wallet.tmp", JSON.stringify(encrypted_wallet))
    files.rename('wallet.tmp', 'wallet.json')
    
    try {
        setInterval(await saveWallet(wallet), 90*1000)
    } catch (err) {
        console.log(err)
        log.error('Error while saving wallet during interval.')
    }
}

/**
 * Save the wallet to db
 *
 * @param {String} txHash - Hash value.
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
 * Check if wallet exists in database.
 *
 * @param {String} txHash - Hash value.
 * @returns {Boolean} Resolves to true if found.
 */
 async function walletExistsInDb(txHash) {
    try {
        const walletLookup = models.Wallet.findAndCountAll()

        return walletLookup > 0
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