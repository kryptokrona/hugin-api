package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.kryptokrona.hugin.model.statistics.PostYearStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostYearStatisticsRepository extends JpaRepository<PostYearStatistics, Long> {
}
