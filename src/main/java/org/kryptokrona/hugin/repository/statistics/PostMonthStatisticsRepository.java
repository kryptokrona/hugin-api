package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostMonthStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostMonthStatisticsRepository extends JpaRepository<PostMonthStatistics, Long> {
}
