/**
 * Time module.
 */


/**
 * Gets timestamp
 *
 * @returns {String}
 */
module.exports.getTimestamp = () => {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Sleep function
 *
 * @returns {Promise}
 */
module.exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Convert date object to unix timestamp
 *
 * @returns {number}
 */
module.exports.convertDateTimeToUnix = (dateObj) => {
  return Math.floor(Date.parse(dateObj) / 1000)
}

/**
 * Convert unix timestamp to date object
 *
 * @returns {Date}
 */
module.exports.convertUnixToDateTime = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000)
}
