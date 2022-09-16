package org.kryptokrona.hugin.util;

import org.kryptokrona.hugin.repository.HashtagRepository;
import org.kryptokrona.hugin.repository.PostEncryptedGroupRepository;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
import org.kryptokrona.hugin.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Seeder job to populate the database when running the dev profile
 *
 * @author Marcus Cvjeticanin
 * @version 0.0.1
 */
@Profile("dev")
@Component
public class SeederUtil implements ApplicationRunner {

	@Autowired
	private HashtagRepository hashtagRepository;

	@Autowired
	private PostEncryptedGroupRepository postEncryptedGroupRepository;

	@Autowired
	private PostEncryptedRepository postEncryptedRepository;

	@Autowired
	private PostRepository postRepository;

	private static final Logger logger = LoggerFactory.getLogger(SeederUtil.class);

	public void seed() {
		logger.info("Seeding data into development DB.");
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		if (
				hashtagRepository.count()              == 0 &&
				postEncryptedGroupRepository.count()   == 0 &&
				postEncryptedRepository.count()        == 0 &&
				postRepository.count()                 == 0
		) {
			seed();
		}
	}

}
