package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Post Encrypted entity.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
@Table(name = "postencrypted")
public class PostEncrypted {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@JsonProperty("tx_hash")
	@Column(name = "tx_hash")
	private String txHash;

	@JsonProperty("tx_box")
	@Column(name = "tx_box")
	private String txBox;

	@JsonProperty("tx_timestamp")
	@Column(name = "tx_timestamp")
	private String txTimestamp;

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

	public String getTxBox() {
		return txBox;
	}

	public void setTxBox(String txBox) {
		this.txBox = txBox;
	}

	public String getTxTimestamp() {
		return txTimestamp;
	}

	public void setTxTimestamp(String txTimestamp) {
		this.txTimestamp = txTimestamp;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
}