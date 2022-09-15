package org.kryptokrona.hugin.http;

import java.util.List;

public class PoolChangesLite {

	private List<TransactionPrefixInfo> transactionPrefixInfoList;

	private List<String> deletedTxIds;

	private boolean isTailBlockActual;

	private String status;
}
