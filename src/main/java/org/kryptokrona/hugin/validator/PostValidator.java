package org.kryptokrona.hugin.validator;

import org.kryptokrona.hugin.http.Post;

/**
 * Post Validator.
 *
 * @author Marcus Cvjeticanin
 */
public class PostValidator {

	/**
	 * Validates if a post object has correct attributes.
	 *
	 * @param post - Post HTTP object
	 * @return Returns true or false
	 */
	public static boolean validatePost(Post post) {
		var isKeyValidated = validateKey(post.getKey());
		var isSignatureValidated = validateSignature(post.getSignature());
		var isTimeValidated = validateTime(post.getTime());
		var isTxHashValidated = validateTxHash(post.getTxHash());
		var isReplyTxHashValidated = validateTxHash(post.getReplyTxHash());

		return isKeyValidated && isSignatureValidated && isTimeValidated && isTxHashValidated && isReplyTxHashValidated;
	}

	/**
	 * Validates if a given key is of correct format.
	 *
	 * @param key - The Post HTTP object key
	 * @return Returns true or false
	 */
	public static boolean validateKey(String key) {
		return false;
	}

	/**
	 * Validates if a given signature is of correct format.
	 *
	 * @param signature - The Post HTTP object signature
	 * @return Returns true or false
	 */
	public static boolean validateSignature(String signature) {
		return false;
	}

	/**
	 * Validates if a given time is of correct format.
	 *
	 * @param time - The Post HTTP object time
	 * @return Returns true or false
	 */
	public static boolean validateTime(long time) {
		return false;
	}

	/**
	 * Validates if a given transaction hash is of correct format.
	 *
	 * @param txHash - The Post HTTP object transaction hash
	 * @return Returns true or false
	 */
	public static boolean validateTxHash(String txHash) {
		return false;
	}
}
