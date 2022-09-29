package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedGroup24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedGroupMonthStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedGroupMonthStatisticsRepository extends JpaRepository<PostEncryptedGroupMonthStatistics, Long> {
}
