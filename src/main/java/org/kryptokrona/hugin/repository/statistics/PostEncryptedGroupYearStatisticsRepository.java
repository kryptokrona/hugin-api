package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.PostEncryptedGroup24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedGroupYearStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEncryptedGroupYearStatisticsRepository extends JpaRepository<PostEncryptedGroupYearStatistics, Long> {
}
