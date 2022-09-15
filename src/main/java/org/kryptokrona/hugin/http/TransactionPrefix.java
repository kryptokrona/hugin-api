package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Transaction Prefix HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class TransactionPrefix {

	private String extra;

	private long unlockTime;

	private int version;

	private List<Vin> vinList;

	private List<Vout> voutList;

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public long getUnlockTime() {
		return unlockTime;
	}

	public void setUnlockTime(long unlockTime) {
		this.unlockTime = unlockTime;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<Vin> getVinList() {
		return vinList;
	}

	public void setVinList(List<Vin> vinList) {
		this.vinList = vinList;
	}

	public List<Vout> getVoutList() {
		return voutList;
	}

	public void setVoutList(List<Vout> voutList) {
		this.voutList = voutList;
	}
}
