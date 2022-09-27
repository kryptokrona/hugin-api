package org.kryptokrona.hugin.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Post Encrypted Group entity.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
@Table(name = "postencryptedgroup")
public class PostEncryptedGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "tx_hash", length=64)
	private String txHash;

	@Column(name = "tx_sb", length=3000) //TODO: need to check how long this actually should be
	private String txSb;

	@Column(name = "tx_timestamp")
	private long txTimestamp;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTxHash() {
		return txHash;
	}

	public void setTxHash(String txHash) {
		this.txHash = txHash;
	}

	public String getTxSb() {
		return txSb;
	}

	public void setTxSb(String txSb) {
		this.txSb = txSb;
	}

	public long getTxTimestamp() {
		return txTimestamp;
	}

	public void setTxTimestamp(long txTimestamp) {
		this.txTimestamp = txTimestamp;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
	}
}
