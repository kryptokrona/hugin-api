package org.kryptokrona.hugin.http;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StatisticsResponse {

	@JsonProperty("24h")
	private long twentyFourHours;

	private long week;

	private long month;

	private long year;

	private long total;

	public long getTwentyFourHours() {
		return twentyFourHours;
	}

	public void setTwentyFourHours(long twentyFourHours) {
		this.twentyFourHours = twentyFourHours;
	}

	public long getWeek() {
		return week;
	}

	public void setWeek(long week) {
		this.week = week;
	}

	public long getMonth() {
		return month;
	}

	public void setMonth(long month) {
		this.month = month;
	}

	public long getYear() {
		return year;
	}

	public void setYear(long year) {
		this.year = year;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

}
