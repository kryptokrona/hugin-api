package org.kryptokrona.hugin.repository.statistics;

import org.kryptokrona.hugin.model.statistics.Post10MStatistics;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Post10MStatisticsRepository extends JpaRepository<Post10MStatistics, Long> {
}
