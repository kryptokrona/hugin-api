package org.kryptokrona.hugin.syncer;

import inet.ipaddr.HostName;
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

	private StatisticsPostService statisticsPostService;

	private static final Logger logger = LoggerFactory.getLogger(StatisticsSyncer.class);

	@Autowired
	public StatisticsSyncer(StatisticsPostService statisticsPostService) {
		this.statisticsPostService = statisticsPostService;
	}

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.debug("Statistics Syncing...");
		// statisticsPostService.save();
	}

}
