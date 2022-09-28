package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Post Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	//TODO: need to confirm this works, perhaps reserved keywords in SQL statement?
	// We will not remove this since this will be implemented shortly.
	@Query(value = "SELECT id, message, key, signature, board, time, nickname, tx_hash, reply, created_at FROM post", nativeQuery = true)
	Page<Post> findAllExcludeAvatar(Pageable pageable);

	Page<Post> findAllByTimeBetween(Pageable pageable, Long startTime, Long endTime);

	Post findPostByTxHash(String txHash);

	List<Post> findAllByCreatedAtBetween(Date startDate, Date endDate);

	boolean existsPostByTxHash(String txHash);

}
