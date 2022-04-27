require('dotenv').config()

const { extraDataToMessage } = require('hugin-crypto')

// lägga in en intervall typ varje minut och göra ny förfrågan

let known_pool_txs = [];

module.exports.backgroundSyncMessages = async () => {
    console.log('Background syncing...');
    let message_was_unknown;
    
    try {
        const resp = await fetch('http://' + 'blocksum.org:11898' + '/get_pool_changes_lite', {
            method: 'POST',
            body: JSON.stringify({
                knownTxsIds: known_pool_txs
            })
        })

        let json = await resp.json();

        json = JSON.stringify(json).replaceAll('.txPrefix', '').replaceAll('transactionPrefixInfo.txHash', 'transactionPrefixInfotxHash');
        json = JSON.parse(json);

        let transactions = json.addedTxs;
        let transaction;

        for (transaction in transactions) {
            try {
                console.log('tx', transactions[transaction].transactionPrefixInfo);
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
                    privateViewKey: '0000000000000000000000000000000000000000000000000000000000000000'
                }
                let message = await extraDataToMessage(thisExtra, knownk, keypair); 

                // let msg = JSON.parse(message)
                console.log('Message?', message)

                // if message == false 
                    // message could not be decrypted (and be saved to encrypted database/table)

                // guard clause here

                // saveMsg(message, thisHash);
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log('Sync error')
    }
}

function trimExtra(extra) {
    try {
        let payload = fromHex(extra.substring(66));

        let payload_json = JSON.parse(payload);
        return fromHex(extra.substring(66))
    } catch (e) {
        return fromHex(Buffer.from(extra.substring(78)).toString())
    }
}