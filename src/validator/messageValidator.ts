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
function validateMessage(messageObj: any) {
  const keyValidated = validateKey(messageObj.key);
  const signatureValidated = validateSignature(messageObj.signature);
  const timeValidated = validateTime(messageObj.time);
  const txHashValidated = validateTxHash(messageObj.tx_hash);

  return keyValidated && signatureValidated && timeValidated && txHashValidated;
}

/**
 * Validates if a given key is correct
 *
 * @param {Object} key - Message key
 * @returns {Boolean}
 */
function validateKey(key: string) {
  return key.startsWith('SEKR') && key.length === 99;
}

/**
 * Validates if a given signature is correct
 *
 * @param {Object} signature - Message signature
 * @returns {Boolean}
 */
function validateSignature(signature: string) {
  const minimumLength = 64;
  const maximumLength = 200;
  return signature.length >= minimumLength && signature.length <= maximumLength;
}

/**
 * Validates if a given time is correct
 *
 * @param {Object} time - Message time
 * @returns {Boolean}
 */
function validateTime(time: number) {
  const timeStr = time.toString();
  return timeStr.length >= 10;
}

/**
 * Validates if a given transaction hash is correct
 *
 * @param {Object} txHash - Message transaction hash
 * @returns {Boolean}
 */
function validateTxHash(txHash: string) {
  return txHash.length === 64;
}

export {
  validateMessage,
  validateKey,
  validateSignature,
  validateTime,
  validateTxHash
};
