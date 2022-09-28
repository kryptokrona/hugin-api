package org.kryptokrona.hugin.syncer;

import inet.ipaddr.HostName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * Statistics Syncer.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class StatisticsSyncer {

	private static final Logger logger = LoggerFactory.getLogger(StatisticsSyncer.class);

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.debug("Statistics Syncing...");

	}

}
