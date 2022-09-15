package org.kryptokrona.hugin.crypto;

public class KeyPair {

	private String privateSpendKey;

	private String privateViewKey;

	public String getPrivateSpendKey() {
		return privateSpendKey;
	}

	public void setPrivateSpendKey(String privateSpendKey) {
		this.privateSpendKey = privateSpendKey;
	}

	public String getPrivateViewKey() {
		return privateViewKey;
	}

	public void setPrivateViewKey(String privateViewKey) {
		this.privateViewKey = privateViewKey;
	}
}
