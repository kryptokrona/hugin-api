package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Transaction Prefix HTTP model.
 *
 * @author Marcus Cvjeticanin
 */
public class TransactionPrefix {

	private String extra;

	private long unlockTime;

	private int version;

	private List<Vin> vinList;

	private List<Vout> voutList;

}
