package org.kryptokrona.hugin.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

/**
 * Post Month Statistics.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
@Table(name = "statistics_post_month")
public class PostMonthStatistics {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private long amount;

	@JsonProperty("created_at")
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@PrePersist
	public void onCreate() {
		createdAt = new Date();
	}

}
