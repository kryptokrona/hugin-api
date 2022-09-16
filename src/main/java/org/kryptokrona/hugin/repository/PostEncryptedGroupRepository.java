package org.kryptokrona.hugin.repository;

import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Encrypted Group Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostEncryptedGroupRepository extends JpaRepository<PostEncryptedGroup, Long> {
}