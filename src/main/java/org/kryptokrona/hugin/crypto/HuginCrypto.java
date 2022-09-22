package org.kryptokrona.hugin.crypto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

/**
 * Hugin Crypto.
 *
 * @author Marcus Cvjeticanin
 */
public class HuginCrypto {

	private static final Logger logger = LoggerFactory.getLogger(HuginCrypto.class);

	public static String trimExtra(String extra) {
		try {
			var payload = fromHex(extra.substring(66));
			return fromHex(extra.substring(66));
		} catch (Exception e) {
			// return fromHex(Buffer);
			return null;
		}
	}

	/**
	 * Converts hex value to string.
	 *
	 * @param hex - Hex value.ß
	 * @return Returns hex value to string
	 */
	public static String fromHex(String hex) {
		var str = "";

		try {
			str = decodeURIComponent(hex.replace("/(..)/g,'%$1'", ""), "UTF-8");
		} catch (Exception e) {
			str = hex;
			logger.error("Invalid hex input.");
		}

		return str;
	}

	/**
	 * Decodes the passed String using an algorithm that's compatible with
	 * JavaScript's <code>decodeURIComponent</code> function. Returns
	 * <code>null</code> if the String is <code>null</code>.
	 *
	 * @param s The encoded String to be decoded
	 * @param charset The charset to use
	 * @return Returns the decoded String
	 */
	public static String decodeURIComponent(String s, String charset) {
		if (s == null) {
			return null;
		}

		String result = null;

		try {
			result = URLDecoder.decode(s, charset);
		} catch (UnsupportedEncodingException e) {
			// this exception should never occur.
			result = s;
		}

		return result;
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
