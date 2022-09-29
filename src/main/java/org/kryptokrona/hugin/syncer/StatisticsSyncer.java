package org.kryptokrona.hugin.syncer;

import org.kryptokrona.hugin.model.statistics.PostHourStatistics;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.kryptokrona.hugin.service.PostService;
import org.kryptokrona.hugin.service.statistics.StatisticsPostEncryptedGroupService;
import org.kryptokrona.hugin.service.statistics.StatisticsPostEncryptedService;
import org.kryptokrona.hugin.service.statistics.StatisticsPostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * Statistics Syncer.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class StatisticsSyncer {

	private final StatisticsPostService statisticsPostService;

	private final StatisticsPostEncryptedService statisticsPostEncryptedService;

	private final StatisticsPostEncryptedGroupService statisticsPostEncryptedGroupService;

	private final PostService postService;

	private final PostEncryptedService postEncryptedService;

	private final PostEncryptedGroupService postEncryptedGroupService;

	private static final Logger logger = LoggerFactory.getLogger(StatisticsSyncer.class);

	@Autowired
	public StatisticsSyncer(
			StatisticsPostService statisticsPostService,
			StatisticsPostEncryptedService statisticsPostEncryptedService,
			StatisticsPostEncryptedGroupService statisticsPostEncryptedGroupService,
			PostService postService,
			PostEncryptedService postEncryptedService,
			PostEncryptedGroupService postEncryptedGroupService
	) {
		this.statisticsPostService = statisticsPostService;
		this.statisticsPostEncryptedService = statisticsPostEncryptedService;
		this.statisticsPostEncryptedGroupService = statisticsPostEncryptedGroupService;
		this.postService = postService;
		this.postEncryptedService = postEncryptedService;
		this.postEncryptedGroupService = postEncryptedGroupService;
	}

	@Scheduled(fixedRate=3000)
	public void sync() {
		logger.debug("Statistics Syncing...");
		var postTest = new PostHourStatistics();
		postTest.setAmount(100);
		statisticsPostService.save(postTest);
	}

}
