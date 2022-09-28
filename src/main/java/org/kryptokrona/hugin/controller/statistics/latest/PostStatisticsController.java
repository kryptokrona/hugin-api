package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.PostStatisticsController.VERSION;

/**
 * Post Statistics Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data of posts.")
public class PostStatisticsController {

	static final String VERSION = "1";

}
