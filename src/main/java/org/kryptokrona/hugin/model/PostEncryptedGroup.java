package org.kryptokrona.hugin.model;

import org.springframework.data.annotation.CreatedDate;

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

	@Column(name = "tx_hash")
	private String txHash;

	@Column(name = "tx_sb")
	private String txSb;

	@Column(name = "tx_timestamp")
	private long txTimestamp;

	@CreatedDate
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
}
