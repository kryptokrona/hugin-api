package org.kryptokrona.hugin.http;

/**
 * Vin HTTP model.
 *
 * Vector input in a transaction. Used as a response object after a
 * POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class Vin {

	private String type;

	private VinValue vinValue;

}
