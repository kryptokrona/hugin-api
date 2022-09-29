package org.kryptokrona.hugin.syncer;

import org.kryptokrona.hugin.model.statistics.*;
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

	// runs every 10 minutes (600000 MS)
	@Scheduled(fixedRate=600000)
	public void syncX() {
		var postsTotal = postService.getTotalItemsBy10M();
		var postsEncryptedTotal = postEncryptedService.getTotalItemsBy10M();
		var postEncryptedGroupTotal = postEncryptedGroupService.getTotalItemsBy10M();

		var post = new Post10MStatistics();
		post.setAmount(postsTotal);

		var postEncrypted = new PostEncrypted10MStatistics();
		postEncrypted.setAmount(postsEncryptedTotal);

		var postEncryptedGroup = new PostEncryptedGroup10MStatistics();
		postEncryptedGroup.setAmount(postEncryptedGroupTotal);

		statisticsPostService.save(post);
		statisticsPostEncryptedService.save(postEncrypted);
		statisticsPostEncryptedGroupService.save(postEncryptedGroup);
	}

	// runs every hour (3600000 MS)
	@Scheduled(fixedRate=3600000)
	public void sync() {
		var postsTotal = postService.getTotalItemsByHour();
		var postsEncryptedTotal = postEncryptedService.getTotalItemsByHour();
		var postEncryptedGroupTotal = postEncryptedGroupService.getTotalItemsByHour();

		var post = new PostHourStatistics();
		post.setAmount(postsTotal);

		var postEncrypted = new PostEncryptedHourStatistics();
		postEncrypted.setAmount(postsEncryptedTotal);

		var postEncryptedGroup = new PostEncryptedGroupHourStatistics();
		postEncryptedGroup.setAmount(postEncryptedGroupTotal);

		statisticsPostService.save(post);
		statisticsPostEncryptedService.save(postEncrypted);
		statisticsPostEncryptedGroupService.save(postEncryptedGroup);
	}

	// runs every 24h (86400000 MS)
	@Scheduled(fixedRate=86400000)
	public void sync24h() {
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

	// runs every week (604800000 MS)
	@Scheduled(fixedRate=604800000)
	public void syncWeek() {
		var postsTotal = postService.getTotalItemsByWeek();
		var postsEncryptedTotal = postEncryptedService.getTotalItemsByWeek();
		var postEncryptedGroupTotal = postEncryptedGroupService.getTotalItemsByWeek();

		var post = new PostWeekStatistics();
		post.setAmount(postsTotal);

		var postEncrypted = new PostEncryptedWeekStatistics();
		postEncrypted.setAmount(postsEncryptedTotal);

		var postEncryptedGroup = new PostEncryptedGroupWeekStatistics();
		postEncryptedGroup.setAmount(postEncryptedGroupTotal);

		statisticsPostService.save(post);
		statisticsPostEncryptedService.save(postEncrypted);
		statisticsPostEncryptedGroupService.save(postEncryptedGroup);
	}

	// runs every month (2629746000 MS)
	@Scheduled(fixedRate=2629746000L)
	public void syncMonth() {
		var postsTotal = postService.getTotalItemsByMonth();
		var postsEncryptedTotal = postEncryptedService.getTotalItemsByMonth();
		var postEncryptedGroupTotal = postEncryptedGroupService.getTotalItemsByMonth();

		var post = new PostMonthStatistics();
		post.setAmount(postsTotal);

		var postEncrypted = new PostEncryptedMonthStatistics();
		postEncrypted.setAmount(postsEncryptedTotal);

		var postEncryptedGroup = new PostEncryptedGroupMonthStatistics();
		postEncryptedGroup.setAmount(postEncryptedGroupTotal);

		statisticsPostService.save(post);
		statisticsPostEncryptedService.save(postEncrypted);
		statisticsPostEncryptedGroupService.save(postEncryptedGroup);
	}

}
