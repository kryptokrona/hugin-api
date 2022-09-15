package org.kryptokrona.hugin.http;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Transaction Prefix Info HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class TransactionPrefixInfo {

	@JsonProperty("transactionPrefixInfo.txHash")
	private String transactionHash;

	@JsonProperty("transactionPrefixInfo.txPrefix")
	private TransactionPrefix transactionPrefix;

	public String getTransactionHash() {
		return transactionHash;
	}

	public void setTransactionHash(String transactionHash) {
		this.transactionHash = transactionHash;
	}

	public TransactionPrefix getTransactionPrefix() {
		return transactionPrefix;
	}

	public void setTransactionPrefix(TransactionPrefix transactionPrefix) {
		this.transactionPrefix = transactionPrefix;
	}
}
