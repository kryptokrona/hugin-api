package org.kryptokrona.hugin.http;

import java.util.List;

public class TransactionPrefix {

	private String extra;

	private long unlockTime;

	private int version;

	private List<Vin> vinList;

	private List<Vout> voutList;
}
