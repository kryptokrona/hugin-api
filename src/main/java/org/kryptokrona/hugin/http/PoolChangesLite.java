package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Pool Changes Lite HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class PoolChangesLite {

	private List<TransactionPrefixInfo> transactionPrefixInfoList;

	private List<String> deletedTxIds;

	private boolean isTailBlockActual;

	private String status;

	public List<TransactionPrefixInfo> getTransactionPrefixInfoList() {
		return transactionPrefixInfoList;
	}

	public void setTransactionPrefixInfoList(List<TransactionPrefixInfo> transactionPrefixInfoList) {
		this.transactionPrefixInfoList = transactionPrefixInfoList;
	}

	public List<String> getDeletedTxIds() {
		return deletedTxIds;
	}

	public void setDeletedTxIds(List<String> deletedTxIds) {
		this.deletedTxIds = deletedTxIds;
	}

	public boolean isTailBlockActual() {
		return isTailBlockActual;
	}

	public void setTailBlockActual(boolean tailBlockActual) {
		isTailBlockActual = tailBlockActual;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
