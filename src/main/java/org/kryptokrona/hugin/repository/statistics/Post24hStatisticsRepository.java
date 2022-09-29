package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.Post24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Post24hStatisticsRepository extends JpaRepository<Post24hStatistics, Long> {
}
