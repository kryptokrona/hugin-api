package org.kryptokrona.hugin.crypto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * OpenBox.
 *
 * @author Marcus Cvjeticanin
 */
public class Box {

	private String box;

	@JsonProperty("t")
	private long timestamp;

	public String getBox() {
		return box;
	}

	public void setBox(String box) {
		this.box = box;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

}
