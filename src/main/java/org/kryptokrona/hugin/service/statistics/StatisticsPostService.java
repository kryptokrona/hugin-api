package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.repository.statistics.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

	public List<Post10MStatistics> getAll10m(long datapoints) {
		return post10MStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostHourStatistics> getAllHours(long datapoints) {
		return postHourStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<Post24hStatistics> getAll24h(long datapoints) {
		return post24hStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostWeekStatistics> getAllWeeks(long datapoints) {
		return postWeekStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostMonthStatistics> getAllMonths(long datapoints) {
		return postMonthStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
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
