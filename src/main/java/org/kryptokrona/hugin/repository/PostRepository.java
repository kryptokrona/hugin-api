package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugincache.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  // Page<Post> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
