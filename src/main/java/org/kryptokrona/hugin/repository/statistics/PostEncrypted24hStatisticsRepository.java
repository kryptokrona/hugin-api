package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncrypted24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncrypted24hStatisticsRepository extends JpaRepository<PostEncrypted24hStatistics, Long> {
}
