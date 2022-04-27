require('dotenv').config()

const { extraDataToMessage } = require('hugin-crypto')

let known_pool_txs = [];

/**
 * Background sync to fetch data
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
module.exports.backgroundSyncMessages = async () => {
    console.log('Background syncing...');
    let message_was_unknown;
    
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
            console.log('Empty array...')
            return;
        }

        for (transaction in transactions) {
            try {
                console.log('tx', transactions[transaction]);
                let thisExtra = transactions[transaction].transactionPrefixInfo.extra;
                let thisHash = transactions[transaction].transactionPrefixInfotxHash;

                if (known_pool_txs.indexOf(thisHash) === -1) {
                    known_pool_txs.push(thisHash);
                    message_was_unknown = true;
                } else {
                    message_was_unknown = false;
                    console.log("This transaction is already known", thisHash);
                    continue;
                }

                let knownk =  []
                let keypair = {
                    privateSpendKey: '0000000000000000000000000000000000000000000000000000000000000000',
                    privateViewKey:  '0000000000000000000000000000000000000000000000000000000000000000'
                }


                // if extra is less than 200 length - skip
                let message
                if (thisExtra !== undefined && thisExtra.length > 200) {
                    message = await extraDataToMessage(thisExtra, knownk, keypair);
                }

                // let msg = JSON.parse(message)

                if (message !== undefined) {
                    console.log('Message?', message)
                    // message could not be decrypted (and be saved to encrypted database/table)
                } else {
                    console.log('No messages...')
                }

                // saveMsg(message, thisHash);
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log('Sync error')
    }
}