package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedGroup24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedGroupWeekStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedGroupWeekStatisticsRepository extends JpaRepository<PostEncryptedGroupWeekStatistics, Long> {
}
