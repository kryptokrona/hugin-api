package org.kryptokrona.hugin.service.statistics;

import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.repository.statistics.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsPostEncryptedGroupService {

	private final PostEncryptedGroupHourStatisticsRepository postEncryptedGroupHourStatisticsRepository;

	private final PostEncryptedGroup24hStatisticsRepository postEncryptedGroup24hStatisticsRepository;

	private final PostEncryptedGroupWeekStatisticsRepository postEncryptedGroupWeekStatisticsRepository;

	private final PostEncryptedGroupMonthStatisticsRepository postEncryptedGroupMonthStatisticsRepository;

	private final PostEncryptedGroup10MStatisticsRepository postEncryptedGroup10MStatisticsRepository;

	@Autowired
	public StatisticsPostEncryptedGroupService(
			PostEncryptedGroupHourStatisticsRepository postEncryptedGroupHourStatisticsRepository,
			PostEncryptedGroup24hStatisticsRepository postEncryptedGroup24hStatisticsRepository,
			PostEncryptedGroupWeekStatisticsRepository postEncryptedGroupWeekStatisticsRepository,
			PostEncryptedGroupMonthStatisticsRepository postEncryptedGroupMonthStatisticsRepository,
			PostEncryptedGroup10MStatisticsRepository postEncryptedGroup10MStatisticsRepository
	) {
		this.postEncryptedGroupHourStatisticsRepository = postEncryptedGroupHourStatisticsRepository;
		this.postEncryptedGroup24hStatisticsRepository = postEncryptedGroup24hStatisticsRepository;
		this.postEncryptedGroupWeekStatisticsRepository = postEncryptedGroupWeekStatisticsRepository;
		this.postEncryptedGroupMonthStatisticsRepository = postEncryptedGroupMonthStatisticsRepository;
		this.postEncryptedGroup10MStatisticsRepository = postEncryptedGroup10MStatisticsRepository;
	}

	public List<PostEncryptedGroup10MStatistics> getAll10m(long datapoints) {
		return null;
	}

	public List<PostEncryptedGroupHourStatistics> getAllHours(long datapoints) {
		return null;
	}

	public List<PostEncryptedGroup24hStatistics> getAll24h(long datapoints) {
		return null;
	}

	public List<PostEncryptedGroupWeekStatistics> getAllWeeks(long datapoints) {
		return null;
	}

	public List<PostEncryptedGroupMonthStatistics> getAllMonths(long datapoints) {
		return null;
	}

	public void save(PostEncryptedGroupHourStatistics postEncryptedGroupHourStatistics) {
		postEncryptedGroupHourStatisticsRepository.save(postEncryptedGroupHourStatistics);
	}

	public void save(PostEncryptedGroup24hStatistics postEncryptedGroup24hStatistics) {
		postEncryptedGroup24hStatisticsRepository.save(postEncryptedGroup24hStatistics);
	}

	public void save(PostEncryptedGroupWeekStatistics postEncryptedGroupWeekStatistics) {
		postEncryptedGroupWeekStatisticsRepository.save(postEncryptedGroupWeekStatistics);
	}

	public void save(PostEncryptedGroupMonthStatistics postEncryptedGroupMonthStatistics) {
		postEncryptedGroupMonthStatisticsRepository.save(postEncryptedGroupMonthStatistics);
	}

	public void save(PostEncryptedGroup10MStatistics postEncryptedGroup10MStatistics) {
		postEncryptedGroup10MStatisticsRepository.save(postEncryptedGroup10MStatistics);
	}
}
