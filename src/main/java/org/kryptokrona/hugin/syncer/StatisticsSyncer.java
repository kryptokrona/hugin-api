package org.kryptokrona.hugin.syncer;

import org.kryptokrona.hugin.model.statistics.Post24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncrypted24hStatistics;
import org.kryptokrona.hugin.model.statistics.PostEncryptedGroup24hStatistics;
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

import java.util.concurrent.TimeUnit;

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

	private final long TIME_HOUR = TimeUnit.HOURS.toMillis(1);

	private static final long TIME_24H = TimeUnit.DAYS.toMillis(1);

	private static final long TIME_WEEK = TimeUnit.DAYS.toMillis(7);

	private static final long TIME_MONTH = TimeUnit.DAYS.toMillis(31);

	private static final long TIME_YEAR = TimeUnit.DAYS.toMillis(365);

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

	// runs every hour to save hours (3600000 MS)
//	@Scheduled(fixedRate=10000)
//	public void sync() {
//		var totalItems = postService.getTotalItemsByHour();
//
//		var postTest = new PostHourStatistics();
//		postTest.setAmount(totalItems);
//
//		statisticsPostService.save(postTest);
//	}

	// runs every 24h to save 24hs (86400000 MS)
	@Scheduled(fixedRate=10000)
	public void sync() {
		var postsTotal = postService.getTotalItemsBy24h();
		var postsEncryptedTotal = postEncryptedService.getTotalItemsBy24h();
		var postEncryptedGroupTotal = postEncryptedGroupService.getTotalItemsBy24h();

		var post = new Post24hStatistics();
		post.setAmount(postsTotal);

		var postEncrypted = new PostEncrypted24hStatistics();
		postEncrypted.setAmount(postsEncryptedTotal);

		var postEncryptedGroup = new PostEncryptedGroup24hStatistics();
		postEncryptedGroup.setAmount(postEncryptedGroupTotal);

		statisticsPostService.save(post);
		statisticsPostEncryptedService.save(postEncrypted);
		statisticsPostEncryptedGroupService.save(postEncryptedGroup);
	}

	// runs every week to save weeks

	// runs every month to save months

	// runs every year to save years



}
