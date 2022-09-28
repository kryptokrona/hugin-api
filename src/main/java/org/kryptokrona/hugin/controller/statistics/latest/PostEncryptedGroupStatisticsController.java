package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.PostEncryptedGroupStatisticsController.VERSION;

/**
 * Post Encrypted Group Statistics Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted-group")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data of encrypted group posts.")
public class PostEncryptedGroupStatisticsController {

	static final String VERSION = "1";

}
