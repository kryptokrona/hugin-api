'use strict'

require('dotenv').config()

const KryptokronaUtils = require('kryptokrona-utils')
const cnUtil = new KryptokronaUtils.CryptoNote()
const nacl = require('tweetnacl')
const naclUtil = require('tweetnacl-util')
var cron = require('node-cron')

function toHex(str,hex) {
    try {
        hex = unescape(encodeURIComponent(str))
        .split('').map(function(v){
            return v.charCodeAt(0).toString(16)
        }).join('')
    } catch(e) {
        hex = str
    }
    
    return hex
}

function nonceFromTimestamp(tmstmp) {
    let nonce = hexToUint(String(tmstmp));
    
    while (nonce.length < nacl.box.nonceLength) {
        tmp_nonce = Array.from(nonce)
        tmp_nonce.push(0);
        nonce = Uint8Array.from(tmp_nonce)
    }
    
    return nonce;
}

function hexToUint(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
}

async function sendBoardsMessage(message) {    
    const my_address = process.env.SYS_ALERT_MY_ADDRESS
    const private_key = process.env.SYS_ALERT_PRIVATE_KEY // Private key for SEKReVPbxzC4tCGtLkxe8Kep4FwPRzbcp8qd3DZ6UiYaeaie8PCoFu7QCnJvCvWFqiAywkQHxdnuK9LP6kxGM7Gd6LKqJhBNW5e
    const signature = await cnUtil.signMessage(message, private_key)
    const timestamp = parseInt(Date.now())
    const nonce = nonceFromTimestamp(timestamp)
    const group = process.env.SYS_ALERT_GROUP
    const nickname = process.env.SYS_ALERT_NICKNAME
    
    let message_json = {
        "m": message,
        "k": my_address,
        "s": signature,
        "g": group,
        "n": nickname
    }
    
    const payload_unencrypted = naclUtil.decodeUTF8(JSON.stringify(message_json))
    const secretbox = nacl.secretbox(payload_unencrypted, nonce, hexToUint(group))
    const payload_encrypted = {"sb":Buffer.from(secretbox).toString('hex'), "t":timestamp}
    const payload_encrypted_hex = toHex(JSON.stringify(payload_encrypted))
    
    return await fetch(`https://${process.env.SYS_ALERT_HOSTNAME}/api/v1/posts`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: payload_encrypted_hex }),
    }).json()
}

async function cpuWarning() {
    console.log("Running CPU check")
    await fetch(`https://${process.env.SYS_ALERT_HOSTNAME}/prometheus/query?query=100 - (avg by (instance) (irate(node_cpu_seconds_total{job="node",mode="idle"}[5m])) * 100)`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            const resp = json.data.result[0].value[1]
            const cpuUsage = parseFloat(resp)
            console.log("CPU ussage: " + cpuUsage)
            
            if (cpuUsage > 80) {
                const message = "The host machine of hugin API has over 80% CPU usage!"
                sendBoardsMessage(message)
            }
        })
}

async function ramWarning() {
    console.log("Running RAM check")
    await fetch(`https://${process.env.SYS_ALERT_HOSTNAME}/prometheus/query?query=100 - ((node_memory_MemAvailable_bytes{job="node"} * 100) / node_memory_MemTotal_bytes{job="node"})`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const resp = json.data.result[0].value[1]
        const ramUsage = parseFloat(resp)
        console.log("RAM ussage: " + ramUsage)
        
        if (ramUsage > 80) {
            const message = "The host machine of hugin API has over 80% RAM usage!"
            sendBoardsMessage(message)
        }
    })
}

async function diskWarning() {
    console.log("Running disk check")
    await fetch(`https://${process.env.SYS_ALERT_HOSTNAME}/prometheus/query?query=100 - (100 * ((node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"} )  / (node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"}) ))`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            const resp = json.data.result[0].value[1]
            const diskUsage = parseFloat(resp)
            console.log("disk usage: " + diskUsage)
            
            if (diskUsage > 80) {
                const message = "The host machine of hugin API has over 80% disk usage!"
                sendBoardsMessage(message)
            }
        })
}

cron.schedule('*/15 * * * *', () => {
    cpuWarning()
    ramWarning()
    diskWarning()
})