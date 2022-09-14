package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Represents a Hashtag entity.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
public class Hashtag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@JsonProperty("name")
	@Column(name = "name")
	private String name;

	@CreatedDate
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;
}