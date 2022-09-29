package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedWeekStatistics;
import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedWeekStatisticsRepository extends JpaRepository<PostEncryptedWeekStatistics, Long> {
}
