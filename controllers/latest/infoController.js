/**
 * Info Controller
 */

'use strict'

let log = require('loglevel')

const { getPagination, getPagingDataPost } = require('../../utils/pagination')
const { getTimestamp, convertDateTimeToUnix, convertUnixToDateTime } = require("../../utils/time")

const infoController = {}


/**
 * Get a specific posts by tx_hash
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
infoController.getInfo = async (req, res) => {
    const [unlockedBalance, lockedBalance] = await wallet.getBalance();
    let info = {
        donationAddress: wallet.getPrimaryAddress(),
        status: unlockedBalance > 0 ? 'online' : 'offline'
    }
    res.json(info)
}

module.exports = infoController
