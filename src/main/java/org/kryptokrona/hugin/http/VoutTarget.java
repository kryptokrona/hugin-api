package org.kryptokrona.hugin.http;

/**
 * Vout Target HTTP model.
 *
 * Response object after a POST request to /get_pool_changes_lite to a node.
 *
 * @author Marcus Cvjeticanin
 */
public class VoutTarget {

	private VoutTargetData voutTargetData;

	private String type;

	public VoutTargetData getVoutTargetData() {
		return voutTargetData;
	}

	public void setVoutTargetData(VoutTargetData voutTargetData) {
		this.voutTargetData = voutTargetData;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
