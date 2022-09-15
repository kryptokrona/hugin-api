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

	private List<TransactionPrefixInfo> addedTxs;

	private List<String> deletedTxsIds;

	private boolean isTailBlockActual;

	private String status;

	public List<TransactionPrefixInfo> getAddedTxs() {
		return addedTxs;
	}

	public void setAddedTxs(List<TransactionPrefixInfo> addedTxs) {
		this.addedTxs = addedTxs;
	}

	public List<String> getDeletedTxsIds() {
		return deletedTxsIds;
	}

	public void setDeletedTxsIds(List<String> deletedTxsIds) {
		this.deletedTxsIds = deletedTxsIds;
	}

	public boolean isTailBlockActual() {
		return isTailBlockActual;
	}

	public void setIsTailBlockActual(boolean isTailBlockActual) {
		isTailBlockActual = isTailBlockActual;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
