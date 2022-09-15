package org.kryptokrona.hugin.validator;

import org.kryptokrona.hugin.http.Post;

/**
 * Post Validator.
 *
 * @author Marcus Cvjeticanin
 */
public class PostValidator {

	public static boolean validatePost(Post post) {
		var isKeyValidated = validateKey(post.getKey());
		var isSignatureValidated = validateSignature(post.getSignature());
		var isTimeValidated = validateTime(post.getTime());
		var isTxHashValidated = validateTxHash(post.getTxHash());
		var isReplyTxHashValidated = validateTxHash(post.getReplyTxHash());

		return isKeyValidated && isSignatureValidated && isTimeValidated && isTxHashValidated && isReplyTxHashValidated;
	}

	public static boolean validateKey(String key) {
		return false;
	}

	public static boolean validateSignature(String signature) {
		return false;
	}

	public static boolean validateTime(long time) {
		return false;
	}

	public static boolean validateTxHash(String txHash) {
		return false;
	}
}
