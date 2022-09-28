package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Hashtag Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

	boolean existsHashtagByName(String name);

	Hashtag findHashtagByName(String name);

	// @Query(value = "", nativeQuery = true)
	// Page<Hashtag> findAllTrending(Pageable pageable);

	List<Hashtag> findAllByCreatedAtBetween(Date startDate, Date endDate);

}
