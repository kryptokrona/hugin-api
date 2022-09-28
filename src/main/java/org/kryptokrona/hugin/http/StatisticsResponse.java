package org.kryptokrona.hugin.http;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StatisticsResponse {

	@JsonProperty("total_items")
	private long totalItems;

	public StatisticsResponse(long totalItems) {
		this.totalItems = totalItems;
	}

	public long getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(long totalItems) {
		this.totalItems = totalItems;
	}
}
