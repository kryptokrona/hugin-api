package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Post Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	boolean existsPostByTxHash(String txHash);

	//TODO: need to confirm this works, perhaps reserved keywords in SQL statement?
	@Query(value = "SELECT id, message, key, signature, board, time, nickname, tx_hash, reply, created_at FROM post", nativeQuery = true)
	Page<Post> findAllExcludeAvatar(Pageable pageable);

	Page<Post> findAllByTimeBetween(Pageable pageable, long startTime, long endTime);

	Post findPostByTxHash(String txHash);

}
