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

	private final Post10MStatisticsRepository post10MStatisticsRepository;

	@Autowired
	public StatisticsPostService(
			PostHourStatisticsRepository postHourStatisticsRepository,
			Post24hStatisticsRepository post24hStatisticsRepository,
			PostWeekStatisticsRepository postWeekStatisticsRepository,
			PostMonthStatisticsRepository postMonthStatisticsRepository,
			Post10MStatisticsRepository post10MStatisticsRepository
	) {
		this.postHourStatisticsRepository = postHourStatisticsRepository;
		this.post24hStatisticsRepository = post24hStatisticsRepository;
		this.postWeekStatisticsRepository = postWeekStatisticsRepository;
		this.postMonthStatisticsRepository = postMonthStatisticsRepository;
		this.post10MStatisticsRepository = post10MStatisticsRepository;
	}

	public void get10MLast6() {
		// get last 10 elements with query instead of getting all
	}

	public void getHourLast12() {

	}

	public void get24hLast7() {

	}

	public void getWeekLast4() {

	}

	public void getMonthLast12() {

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

	public void save(Post10MStatistics post10MStatistics) {
		post10MStatisticsRepository.save(post10MStatistics);
	}
}
