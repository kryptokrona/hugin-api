package org.kryptokrona.hugin.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

/**
 * Post Hour Statistics.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
@Table(name = "statistics_post_hour")
public class PostHourStatistics {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private long amount;

	@JsonProperty("created_at")
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

}
