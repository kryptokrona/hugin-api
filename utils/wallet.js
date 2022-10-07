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

module.exports.optimizeMessages(nbrOfTxs, fee=10000, attempt=0) {
  if (attempt > 10) {
    return false;
  }

  const [walletHeight, localHeight, networkHeight] = wallet.getSyncStatus();

  let inputs = await wallet.subWallets.getSpendableTransactionInputs(wallet.subWallets.getAddresses(), networkHeight);

  if (inputs.length > 8) {
    return inputs.length;
  }

  let subWallets = wallet.subWallets.subWallets;

  subWallets.forEach((value, name) => {
    let txs = value.unconfirmedIncomingAmounts.length;

    if (txs > 0) {
      return txs;
    }
  })

  let payments = [];
  let i = 0;

  /* User payment */
  while (i < nbrOfTxs - 1 && i < 10) {
    payments.push([
        Globals.wallet.subWallets.getAddresses()[0],
        2000
    ]);

    i += 1;

  }

  let result = await Globals.wallet.sendTransactionAdvanced(
      payments, // destinations,
      3, // mixin
      {fixedFee: 1000, isFixedFee: true}, // fee
      undefined, //paymentID
      undefined, // subWalletsToTakeFrom
      undefined, // changeAddress
      true, // relayToNetwork
      false, // sneedAll
      undefined
  );

  return true;
}
