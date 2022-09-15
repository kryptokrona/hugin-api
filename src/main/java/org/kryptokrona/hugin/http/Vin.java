package org.kryptokrona.hugin.http;

import com.google.gson.annotations.SerializedName;

/**
 * Vin HTTP model.
 *
 * Vector input in a transaction. Used as a response object after a
 * POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class Vin {

	private String type;

	@SerializedName("value")
	private VinValue vinValue;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public VinValue getVinValue() {
		return vinValue;
	}

	public void setVinValue(VinValue vinValue) {
		this.vinValue = vinValue;
	}
}
