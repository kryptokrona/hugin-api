// Copyright (c) 2022-2023, The Kryptokrona Project
//
// Created by Marcus Cvjeticanin
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Message Validator
 */

'use strict'

/**
 * Validates if a message object has correct attributes
 *
 * @param {Object} messageObj - Message object
 * @returns {Boolean}
 */
module.exports.validateMessage = (messageObj) => {
    const keyValidated = validateKey(messageObj.key)
    const signatureValidated = validateSignature(messageObj.signature)
    const timeValidated = validateTime(messageObj.time)
    const txHashValidated = validateTxHash(messageObj.tx_hash)

    return keyValidated && signatureValidated && timeValidated && txHashValidated;
}

/**
 * Validates if a given key is correct
 *
 * @param {Object} key - Message key
 * @returns {Boolean}
 */
const validateKey = (key) => {
    return key.startsWith('SEKR') && key.length === 99
}

/**
 * Validates if a given signature is correct
 *
 * @param {Object} signature - Message signature
 * @returns {Boolean}
 */
const validateSignature = (signature) => {
    const minimumLength = 64
    const maximumLength = 200
    return signature.length >= minimumLength && signature.length <= maximumLength
}

/**
 * Validates if a given time is correct
 *
 * @param {Object} time - Message time
 * @returns {Boolean}
 */
const validateTime = (time) => {
    const timeStr = time.toString()
    return timeStr.length >= 10
}

/**
 * Validates if a given transaction hash is correct
 *
 * @param {Object} txHash - Message transaction hash
 * @returns {Boolean}
 */
const validateTxHash = (txHash) => {
    return txHash.length === 64
}
