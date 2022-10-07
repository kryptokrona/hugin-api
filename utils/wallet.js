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
        let test = JSON.parse(json_wallet)
        console.log('json wallet file?', JSON.parse(test))
        const [wallet, err] = await WB.WalletBackend.loadWalletFromJSON(daemon, json_wallet);
        console.log(err)
        return wallet
    } catch (err) {
        console.log('Json wallet error, try backup wallet file', err)
        return await WB.WalletBackend.createWallet(daemon);
    }
}