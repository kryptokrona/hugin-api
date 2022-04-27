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