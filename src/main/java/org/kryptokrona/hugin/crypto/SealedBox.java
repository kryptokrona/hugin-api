package org.kryptokrona.hugin.crypto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SealedBox {

	private String sb;

	@JsonProperty("t")
	private long timestamp;

	public String getSb() {
		return sb;
	}

	public void setSb(String sb) {
		this.sb = sb;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
}
