package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedYearStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedYearStatisticsRepository extends JpaRepository<PostEncryptedYearStatistics, Long> {
}