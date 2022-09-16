package org.kryptokrona.hugin.util;

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

	@Override
	public void run(ApplicationArguments args) throws Exception {

	}

}
