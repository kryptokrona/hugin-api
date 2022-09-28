/**
 * Avatar module.
 */

'use strict'

let Identicon  = require('identicon.js')
let intToRGB = require('int-to-rgb')

module.exports.generate = (hash, format='png') => {
    // get custom color scheme based on address
    let rgb = intToRGB(hashCode(hash))

    // options for avatar
    let options = {
        foreground: [rgb.red, rgb.green, rgb.blue, 255], // rgba black
        background: [
            parseInt(rgb.red / 10),
            parseInt(rgb.green / 10),
            parseInt(rgb.blue / 10), 0], // rgba white
        margin: 0.2, // 20% margin
        size: 40, // 420px square
        format: format // use svg instead of png
    }

    // create a base64 encoded svg
    return new Identicon(hash, options).toString();
}

const hashCode = (str) => {
    let hash = Math.abs(generateHashCode(str))*0.007812499538;
    return Math.floor(hash);
}

const generateHashCode = (str) => {
    let hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}