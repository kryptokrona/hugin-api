package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedGroup24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedGroupHourStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedGroupHourStatisticsRepository extends JpaRepository<PostEncryptedGroupHourStatistics, Long> {
}
