package org.kryptokrona.hugin.util;

import static org.kryptokrona.hugin.util.IdenticonGeneratorUtil.*;

/**
 * Avatar Util.
 *
 * @author Marcus Cvjeticanin
 */
public class AvatarUtil {

	/**
	 * Generates a base64 encoded svg. This is used for saving avatar information of each post.
	 *
	 * @param hash The hash to use to generate the svg
	 * @param format The format to use e.g jpg, png, gif etc.
	 * @return Returns a base64 encoded svg string
	 */
	public static String generateBase64EncodedSvg(String hash, String format) {
		var hashCode = getHashCode(hash);

		//TODO: do not work yet...
		String md5 = md5Hex(hash.toLowerCase());

		return getIdenticon(generateIdenticons(md5, 420, 420));
	}

	/**
	 * Method overloading for generateBase64EncodedSvg method to not be forced
	 * to use the format parameter. Defaults to png.
	 *
	 * @param hash The hash to use to generate the svg
	 * @return Returns a base64 encoded svg string
	 */
	public static String generateBase64EncodedSvg(String hash) {
		return generateBase64EncodedSvg(hash, "png");
	}

	/**
	 * Gets the hash code in double value.
	 *
	 * @param str The string to get hashcode from
	 * @return Returns a hashcode in double value
	 */
	public static double getHashCode(String str) {
		var hash = Math.abs(generateHashCode(str)) * 0.007812499538;
		return Math.floor(hash);
	}

	/**
	 * Generates a new hashcode.
	 *
	 * @param str The hashcode to use this should be the return value from getHashCode method
	 * @return Returns a new hashcode in string format
	 */
	public static long generateHashCode(String str) {
		var hash = 0;

		if (str.length() == 0) {
			return hash;
		}

		for (int i = 0; i < str.length(); i++) {
			var tmp = Character.codePointAt(str, i);
			hash = ((hash<<5) - hash) + tmp;
		}

		return hash;
	}
}
