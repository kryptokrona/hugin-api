package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Known Pool Transactions HTTP model.
 *
 * Used in a POST request to send payload to node.
 *
 * @author Marcus Cvjeticanin
 */
public class KnownPoolTxs {

	private List<String> knownTxsIds;

	public List<String> getKnownTxsIds() {
		return knownTxsIds;
	}

	public void setKnownTxsIds(List<String> knownTxsIds) {
		this.knownTxsIds = knownTxsIds;
	}
}
