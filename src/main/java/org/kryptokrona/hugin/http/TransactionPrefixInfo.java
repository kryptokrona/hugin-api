package org.kryptokrona.hugin.http;

import com.google.gson.annotations.SerializedName;

/**
 * Transaction Prefix Info HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class TransactionPrefixInfo {

	@SerializedName("txHash")
	private String transactionHash;

	@SerializedName("txPrefix")
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
