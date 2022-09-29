package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedHourStatistics;
import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedHourStatisticsRepository extends JpaRepository<PostEncryptedHourStatistics, Long> {
}
