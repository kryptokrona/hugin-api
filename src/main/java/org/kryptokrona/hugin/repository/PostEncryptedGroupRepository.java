package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Post Encrypted Group Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostEncryptedGroupRepository extends JpaRepository<PostEncryptedGroup, Long> {
	
	PostEncryptedGroup findPostEncryptedGroupByTxHash(String txHash);

	Page<PostEncryptedGroup> findAllByTxTimestampBetween(Pageable pageable, Long startTime, Long endTime);

	List<PostEncryptedGroup> findAllByCreatedAtBetween(Date startDate, Date endDate);

	boolean existsPostEncryptedGroupByTxHash(String txHash);

	boolean existsPostEncryptedGroupByTxSb(String txSb);

}
