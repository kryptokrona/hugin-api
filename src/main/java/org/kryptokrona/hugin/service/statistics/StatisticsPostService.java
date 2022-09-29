package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.repository.statistics.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsPostService {

	private final PostHourStatisticsRepository postHourStatisticsRepository;

	private final Post24hStatisticsRepository post24hStatisticsRepository;

	private final PostWeekStatisticsRepository postWeekStatisticsRepository;

	private final PostMonthStatisticsRepository postMonthStatisticsRepository;

	private final PostYearStatisticsRepository postYearStatisticsRepository;

	@Autowired
	public StatisticsPostService(
			PostHourStatisticsRepository postHourStatisticsRepository,
			Post24hStatisticsRepository post24hStatisticsRepository,
			PostWeekStatisticsRepository postWeekStatisticsRepository,
			PostMonthStatisticsRepository postMonthStatisticsRepository,
			PostYearStatisticsRepository postYearStatisticsRepository
	) {
		this.postHourStatisticsRepository = postHourStatisticsRepository;
		this.post24hStatisticsRepository = post24hStatisticsRepository;
		this.postWeekStatisticsRepository = postWeekStatisticsRepository;
		this.postMonthStatisticsRepository = postMonthStatisticsRepository;
		this.postYearStatisticsRepository = postYearStatisticsRepository;
	}

	public void save(PostHourStatistics postHourStatistics) {
		postHourStatisticsRepository.save(postHourStatistics);
	}

	public void save(Post24hStatistics post24hStatistics) {
		post24hStatisticsRepository.save(post24hStatistics);
	}

	public void save(PostWeekStatistics postWeekStatistics) {
		postWeekStatisticsRepository.save(postWeekStatistics);
	}

	public void save(PostMonthStatistics postMonthStatistics) {
		postMonthStatisticsRepository.save(postMonthStatistics);
	}

	public void save(PostYearStatistics postYearStatistics) {
		postYearStatisticsRepository.save(postYearStatistics);
	}
}
