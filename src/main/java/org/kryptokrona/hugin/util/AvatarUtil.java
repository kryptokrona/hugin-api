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

		// get custom color scheme based on address
		int red = (int) hashCode >> 16;
		int green = (int) hashCode - (red << 16);
		int blue = (int) hashCode - (red << 16) - (green << 8);

		String md5 = md5Hex(hash.toLowerCase());
		saveImage(generateIdenticons(md5, 500, 500), md5, format);


		return "";
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
	private static double getHashCode(String str) {
		var hash = Math.abs(generateHashCode(str)) * 0.007812499538;
		return Math.floor(hash);
	}

	/**
	 * Generates a new hashcode.
	 *
	 * @param str The hashcode to use this should be the return value from getHashCode method
	 * @return Returns a new hashcode in string format
	 */
	private static long generateHashCode(String str) {
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
