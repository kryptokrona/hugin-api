package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsPostEncryptedGroupController.VERSION;

/**
 * Statistics Post Encrypted Group Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted-group")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data of encrypted group posts.")
public class StatisticsPostEncryptedGroupController {

	static final String VERSION = "1";

	private final PostEncryptedGroupService postEncryptedGroupService;

	@Autowired
	public StatisticsPostEncryptedGroupController(PostEncryptedGroupService postEncryptedGroupService1) {
		this.postEncryptedGroupService = postEncryptedGroupService1;
	}

}
