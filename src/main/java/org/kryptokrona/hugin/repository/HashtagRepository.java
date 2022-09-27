package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Hashtag Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

	boolean existsHashtagByName(String name);

	@Query(value = "", nativeQuery = true)
	Page<Hashtag> findAllTrending(Pageable pageable);

}
