package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedMonthStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedMonthStatisticsRepository extends JpaRepository<PostEncryptedMonthStatistics, Long> {
}
