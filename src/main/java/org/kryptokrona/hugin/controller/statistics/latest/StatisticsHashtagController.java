package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsHashtagController.VERSION;

/**
 * Statistics Hashtag Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/hashtags")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data of hashtags.")
public class StatisticsHashtagController {

	static final String VERSION = "1";

}
