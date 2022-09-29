package org.kryptokrona.hugin.controller.statistics;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.StatisticsPostController.VERSION;

/**
 * Statistics Post Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/posts")
@Tag(name = "posts", description = "Set of endpoints to get data of posts.")
public class StatisticsPostController {

	static final String VERSION = "1";

	//TODO to be done. We need to expose the data from the db as well as storing.


}
