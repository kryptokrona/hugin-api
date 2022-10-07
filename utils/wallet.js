/**
 * Wallet module.
 */

const WB = require('kryptokrona-wallet-backend-js')
const files = require('fs/promises')
const log = require('loglevel')

const { getTimestamp } = require('./time')

/**
 * Open a wallet
 *
 * @returns {String}
 */
module.exports.openWallet = async (daemon) => {
    log.info(getTimestamp() + ' INFO: Open wallet...')

    try {
        const json_wallet = await files.readFile("wallet.json")
        const [wallet, error] = await WB.WalletBackend.openWalletFromEncryptedString(daemon, JSON.parse(json_wallet), 'hugin')
        log.info(getTimestamp() + ' INFO: Wallet found, loading...')
        return wallet
    } catch (err) {
        log.info(getTimestamp() + ' INFO: No wallet found, creating a new one...')
        return await WB.WalletBackend.createWallet(daemon)
    }
}

module.exports.optimizeMessages = async (nbrOfTxs, fee = 10000, attempt = 0) => {
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
            Globals.wallet.subWallets.getAddresses()[0],
            2000
        ])

        i += 1

    }

    await Globals.wallet.sendTransactionAdvanced(
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
