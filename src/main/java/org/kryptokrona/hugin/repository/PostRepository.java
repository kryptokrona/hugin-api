package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	boolean existsPostByTxHash(String txHash);
}
