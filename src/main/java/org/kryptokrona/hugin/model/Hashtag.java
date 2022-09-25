package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Hashtag entity.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
public class Hashtag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "name")
	private String name;

	@CreatedDate
	@Generated(GenerationTime.INSERT)
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	@ManyToMany(mappedBy="hashtags")
	List<Post> posts;

	@JsonGetter("posts")
	public List<String> getAllPosts() {
		if (posts != null) {
			return posts.stream()
					.map(p -> {
						return "/api/v1/posts/" + p.getId();
					}).collect(Collectors.toList());
		}
		return null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

}