package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.PostStatistics;
import org.kryptokrona.hugin.repository.statistics.PostHourStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsPostService {

	private final PostHourStatisticsRepository postHourStatisticsRepository;

	@Autowired
	public StatisticsPostService(PostHourStatisticsRepository postHourStatisticsRepository) {
		this.postHourStatisticsRepository = postHourStatisticsRepository;
	}

	public void save(PostStatistics postStatistics) {

	}
}
