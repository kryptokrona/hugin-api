/**
 * Time.
 */

/**
 * Gets timestamp
 *
 * @returns {string}
 */
function getTimestamp() {
    const pad = (n: any, s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Sleep function
 *
 * @returns {Promise}
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert date to unix timestamp
 *
 * @returns {number}
 */
function convertDateTimeToUnix(dateObj: string) {
  return Math.floor(Date.parse(dateObj) / 1000);
}

/**
 * Convert unix timestamp to date object
 *
 * @returns {Date}
 */
function convertUnixToDateTime(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000);
}

export {
  getTimestamp,
  sleep,
  convertDateTimeToUnix,
  convertUnixToDateTime
};