package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugincache.model.PostEncrypted;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Encrypted Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostEncryptedRepository extends JpaRepository<PostEncrypted, Long> {
}