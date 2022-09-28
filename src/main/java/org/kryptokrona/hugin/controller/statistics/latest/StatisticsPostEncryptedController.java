package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsPostEncryptedController.VERSION;

/**
 * Statistics Post Encrypted Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data of encrypted posts.")
public class StatisticsPostEncryptedController {

	static final String VERSION = "1";

	private final PostEncryptedService postEncryptedService;

	@Autowired
	public StatisticsPostEncryptedController(PostEncryptedService postEncryptedService) {
		this.postEncryptedService = postEncryptedService;
	}

}
