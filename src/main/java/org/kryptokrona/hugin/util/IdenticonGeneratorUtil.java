package org.kryptokrona.hugin.util;

import javax.imageio.ImageIO;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Identicon Generator Util.
 *
 * Most credit to GrenderG @ GitHub on the implementation.
 * Some slight alterations to the code has been done.
 *
 * @author Marcus Cvjeticanin
 * @author grender (@GrenderG)
 */
public class IdenticonGeneratorUtil {

	public static BufferedImage generateIdenticons(String text, int image_width, int image_height) {
		int width = 5, height = 5;

		byte[] hash = text.getBytes();

		BufferedImage identicon = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		WritableRaster raster = identicon.getRaster();

		int[] background = new int[] {255,255,255, 0};
		int[] foreground = new int[] {hash[0] & 255, hash[1] & 255, hash[2] & 255, 255};

		for(int x = 0; x < width; x++) {
			//Enforce horizontal symmetry
			int i = x < 3 ? x : 4 - x;
			for(int y = 0; y < height; y++) {
				int[] pixelColor;
				//toggle pixels based on bit being on/off
				if ((hash[i] >> y & 1) == 1)
					pixelColor = foreground;
				else
					pixelColor = background;
				raster.setPixel(x, y, pixelColor);
			}
		}

		BufferedImage finalImage = new BufferedImage(image_width, image_height, BufferedImage.TYPE_INT_ARGB);

		//Scale image to the size you want
		AffineTransform at = new AffineTransform();
		at.scale(image_width / width, image_height / height);
		AffineTransformOp op = new AffineTransformOp(at, AffineTransformOp.TYPE_NEAREST_NEIGHBOR);
		finalImage = op.filter(identicon, finalImage);

		return finalImage;
	}

	public static String hex(byte[] array) {
		StringBuilder sb = new StringBuilder();
		for (byte b : array) {
			sb.append(Integer.toHexString((b
					& 0xFF) | 0x100).substring(1, 3));
		}
		return sb.toString();
	}

	public static String md5Hex(String message) {
		try {
			MessageDigest md =
					MessageDigest.getInstance("MD5");
			return hex (md.digest(message.getBytes("CP1252")));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void saveImage(BufferedImage bufferedImage, String name, String format) {
		File outputfile = new File(name + String.format(".%s", format.toLowerCase()));
		try {
			ImageIO.write(bufferedImage, "png", outputfile);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
