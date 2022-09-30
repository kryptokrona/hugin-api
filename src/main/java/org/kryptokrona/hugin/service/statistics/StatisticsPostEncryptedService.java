package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.repository.statistics.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsPostEncryptedService {

	private final PostEncryptedHourStatisticsRepository postEncryptedHourStatisticsRepository;

	private final PostEncrypted24hStatisticsRepository postEncrypted24hStatisticsRepository;

	private final PostEncryptedWeekStatisticsRepository postEncryptedWeekStatisticsRepository;

	private final PostEncryptedMonthStatisticsRepository postEncryptedMonthStatisticsRepository;

	private final PostEncrypted10MStatisticsRepository postEncrypted10MStatisticsRepository;

	@Autowired
	public StatisticsPostEncryptedService(
			PostEncryptedHourStatisticsRepository postEncryptedHourStatisticsRepository,
			PostEncrypted24hStatisticsRepository postEncrypted24hStatisticsRepository,
			PostEncryptedWeekStatisticsRepository postEncryptedWeekStatisticsRepository,
			PostEncryptedMonthStatisticsRepository postEncryptedMonthStatisticsRepository,
			PostEncrypted10MStatisticsRepository postEncrypted10MStatisticsRepository
	) {
		this.postEncryptedHourStatisticsRepository = postEncryptedHourStatisticsRepository;
		this.postEncrypted24hStatisticsRepository = postEncrypted24hStatisticsRepository;
		this.postEncryptedWeekStatisticsRepository = postEncryptedWeekStatisticsRepository;
		this.postEncryptedMonthStatisticsRepository = postEncryptedMonthStatisticsRepository;
		this.postEncrypted10MStatisticsRepository = postEncrypted10MStatisticsRepository;
	}

	public List<PostEncrypted10MStatistics> getAll10m(long datapoints) {
		return postEncrypted10MStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostEncryptedHourStatistics> getAllHours(long datapoints) {
		return postEncryptedHourStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostEncrypted24hStatistics> getAll24h(long datapoints) {
		return postEncrypted24hStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostEncryptedWeekStatistics> getAllWeeks(long datapoints) {
		return postEncryptedWeekStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public List<PostEncryptedMonthStatistics> getAllMonths(long datapoints) {
		return postEncryptedMonthStatisticsRepository
				.findAll()
				.stream()
				.limit(datapoints)
				.toList();
	}

	public void save(PostEncryptedHourStatistics postEncryptedHourStatistics) {
		postEncryptedHourStatisticsRepository.save(postEncryptedHourStatistics);
	}

	public void save(PostEncrypted24hStatistics postEncrypted24hStatistics) {
		postEncrypted24hStatisticsRepository.save(postEncrypted24hStatistics);
	}

	public void save(PostEncryptedWeekStatistics postEncryptedWeekStatistics) {
		postEncryptedWeekStatisticsRepository.save(postEncryptedWeekStatistics);
	}

	public void save(PostEncryptedMonthStatistics postEncryptedMonthStatistics) {
		postEncryptedMonthStatisticsRepository.save(postEncryptedMonthStatistics);
	}

	public void save(PostEncrypted10MStatistics postEncrypted10MStatistics) {
		postEncrypted10MStatisticsRepository.save(postEncrypted10MStatistics);
	}

}
