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

}