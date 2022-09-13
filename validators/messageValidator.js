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
