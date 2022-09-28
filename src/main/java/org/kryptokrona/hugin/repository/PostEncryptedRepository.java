package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.PostEncrypted;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Post Encrypted Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostEncryptedRepository extends JpaRepository<PostEncrypted, Long> {

	PostEncrypted findPostEncryptedByTxHash(String txHash);

	Page<PostEncrypted> findAllByTxTimestampBetween(Pageable pageable, Long startTime, Long endTime);

	List<PostEncrypted> findAllByCreatedAtBetween(Date startDate, Date endDate);

	boolean existsPostEncryptedByTxHash(String txHash);

	boolean existsPostEncryptedByTxBox(String txBox);

}
