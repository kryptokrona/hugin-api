package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostWeekStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostWeekStatisticsRepository extends JpaRepository<PostWeekStatistics, Long> {
}
