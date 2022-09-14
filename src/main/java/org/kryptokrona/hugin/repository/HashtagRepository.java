package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugincache.model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Hashtag Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
}
