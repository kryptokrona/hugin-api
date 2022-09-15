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

}
