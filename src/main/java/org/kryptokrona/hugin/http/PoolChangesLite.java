package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Pool Changes Lite HTTP model.
 *
 * @author Marcus Cvjeticanin
 */
public class PoolChangesLite {

	private List<TransactionPrefixInfo> transactionPrefixInfoList;

	private List<String> deletedTxIds;

	private boolean isTailBlockActual;

	private String status;

}
