package org.kryptokrona.hugin.controller.latest;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.latest.HashtagController.VERSION;

/**
 * Statistics Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics")
@Tag(name = "statistics", description = "Set of endpoints to get statistics.")
public class StatisticsController {
}
