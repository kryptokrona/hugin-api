/**
 * Wallet module.
 */

 const WB = require('kryptokrona-wallet-backend-js');
 const files = require('fs/promises');

/**
 * Open a wallet
 *
 * @returns {String}
 */
module.exports.openWallet = async (daemon) => {
    console.log('Open wallet')

    try {
        const json_wallet = await files.readFile("wallet.json");
         const [wallet, error] = await WB.WalletBackend.openWalletFromEncryptedString(daemon, JSON.parse(json_wallet), 'hugin');
         console.log('Wallet found, loading..');
         return wallet
    } catch (err) {
        console.log('No wallet found, creating a new one..', err)
        return await WB.WalletBackend.createWallet(daemon);
    }
}
