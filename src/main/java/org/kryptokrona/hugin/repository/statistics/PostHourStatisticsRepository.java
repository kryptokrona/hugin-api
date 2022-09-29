package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Post Repository.
 *
 * @author Marcus Cvjeticanin
 */
@Repository
public interface PostHourStatisticsRepository extends JpaRepository<PostHourStatistics, Long> {
}