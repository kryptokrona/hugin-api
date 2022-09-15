package org.kryptokrona.hugin.http;

/**
 * Post HTTP model that represent data we get from the node.
 *
 * @author Marcus Cvjeticanin
 */
public class Post {

	private String message;

	private String key;

	private String signature;

	private String board;

	private long time;

	private String nickname;

	private String txHash;

	private String replyTxHash;

	public Post(String message, String key, String signature, String board, long time, String nickname, String txHash, String replyTxHash) {
		this.message = message;
		this.key = key;
		this.signature = signature;
		this.board = board;
		this.time = time;
		this.nickname = nickname;
		this.txHash = txHash;
		this.replyTxHash = replyTxHash;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getBoard() {
		return board;
	}

	public void setBoard(String board) {
		this.board = board;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getTxHash() {
		return txHash;
	}

	public void setTxHash(String txHash) {
		this.txHash = txHash;
	}

	public String getReplyTxHash() {
		return replyTxHash;
	}

	public void setReplyTxHash(String replyTxHash) {
		this.replyTxHash = replyTxHash;
	}
}
