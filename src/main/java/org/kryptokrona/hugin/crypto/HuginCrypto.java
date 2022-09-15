package org.kryptokrona.hugin.crypto;

import java.util.List;

/**
 * Hugin Crypto.
 *
 * @author Marcus Cvjeticanin
 */
public class HuginCrypto {

	public static String trimExtra(String extra) {
		return null;
	}

	public static String fromHex(int hex, String str) {
		return null;
	}

	/**
	 * Takes raw extra data from the blockchain and converts it to a message.
	 *
	 * @param extra The extra
	 * @param knownKeys Public keys
	 * @param xkrKeyPair Regular Kryptokrona key pair
	 * @return Returns open sealed box from the extra data
	 */
	public static OpenBox extraDataToMessage(String extra, List<String> knownKeys, KeyPair xkrKeyPair) {
		return null;
	}
}
