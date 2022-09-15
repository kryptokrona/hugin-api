package org.kryptokrona.hugin.http;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Vin Value HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class VinValue {

	private long amount;

	@SerializedName("k_image")
	private String kImage;

	@SerializedName("key_offsets")
	private List<Long> keyOffsets;

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public String getkImage() {
		return kImage;
	}

	public void setkImage(String kImage) {
		this.kImage = kImage;
	}

	public List<Long> getKeyOffsets() {
		return keyOffsets;
	}

	public void setKeyOffsets(List<Long> keyOffsets) {
		this.keyOffsets = keyOffsets;
	}
}
