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

}
