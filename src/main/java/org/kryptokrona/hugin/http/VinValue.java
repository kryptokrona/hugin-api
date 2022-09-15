package org.kryptokrona.hugin.http;

import java.util.List;

/**
 * Vin Value HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class VinValue {

	private long amount;

	private String kImage;

	private List<Long> keyOffsets;
}
