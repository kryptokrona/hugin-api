package org.kryptokrona.hugin.http;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Vout HTTP model.
 *
 * Vector output in a transaction. Used as a response object after a
 * POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class Vout {

	private long amount;

	@JsonProperty("target")
	private VoutTarget voutTarget;

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public VoutTarget getVoutTarget() {
		return voutTarget;
	}

	public void setVoutTarget(VoutTarget voutTarget) {
		this.voutTarget = voutTarget;
	}
}
