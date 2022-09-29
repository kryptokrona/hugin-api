package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.repository.statistics.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsPostEncryptedService {

	private final PostEncryptedHourStatisticsRepository postEncryptedHourStatisticsRepository;

	private final PostEncrypted24hStatisticsRepository postEncrypted24hStatisticsRepository;

	private final PostEncryptedWeekStatisticsRepository postEncryptedWeekStatisticsRepository;

	private final PostEncryptedMonthStatisticsRepository postEncryptedMonthStatisticsRepository;

	private final PostEncryptedYearStatisticsRepository postEncryptedYearStatisticsRepository;

	@Autowired
	public StatisticsPostEncryptedService(
			PostEncryptedHourStatisticsRepository postEncryptedHourStatisticsRepository,
			PostEncrypted24hStatisticsRepository postEncrypted24hStatisticsRepository,
			PostEncryptedWeekStatisticsRepository postEncryptedWeekStatisticsRepository,
			PostEncryptedMonthStatisticsRepository postEncryptedMonthStatisticsRepository,
			PostEncryptedYearStatisticsRepository postEncryptedYearStatisticsRepository
	) {
		this.postEncryptedHourStatisticsRepository = postEncryptedHourStatisticsRepository;
		this.postEncrypted24hStatisticsRepository = postEncrypted24hStatisticsRepository;
		this.postEncryptedWeekStatisticsRepository = postEncryptedWeekStatisticsRepository;
		this.postEncryptedMonthStatisticsRepository = postEncryptedMonthStatisticsRepository;
		this.postEncryptedYearStatisticsRepository = postEncryptedYearStatisticsRepository;
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

	public void save(PostEncryptedYearStatistics postEncryptedYearStatistics) {
		postEncryptedYearStatisticsRepository.save(postEncryptedYearStatistics);
	}

}
