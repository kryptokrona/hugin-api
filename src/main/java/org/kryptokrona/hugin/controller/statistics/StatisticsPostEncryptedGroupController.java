package org.kryptokrona.hugin.controller.statistics;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.service.statistics.StatisticsPostEncryptedGroupService;
import org.kryptokrona.hugin.service.statistics.StatisticsPostEncryptedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.kryptokrona.hugin.controller.statistics.StatisticsPostEncryptedGroupController.VERSION;

/**
 * Statistics Post Encrypted Group Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted-group")
@Tag(name = "statistics", description = "Set of endpoints to get data of posts.")
public class StatisticsPostEncryptedGroupController {

	static final String VERSION = "1";

	private final StatisticsPostEncryptedGroupService statisticsPostEncryptedGroupService;

	public StatisticsPostEncryptedGroupController(StatisticsPostEncryptedGroupService statisticsPostEncryptedGroupService) {
		this.statisticsPostEncryptedGroupService = statisticsPostEncryptedGroupService;
	}

	@GetMapping("/datapoints/10m")
	@Operation(
			summary = "Get datapoints of 10 minutes data",
			description = "Get all datapoints of 10 minutes data."
	)
	public ResponseEntity<List<PostEncryptedGroup10MStatistics>> getAll10m(@PathVariable long datapoints) {
		var obj = statisticsPostEncryptedGroupService.getAll10m(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/hours")
	@Operation(
			summary = "Get datapoints of hours data",
			description = "Get all datapoints of hours data."
	)
	public ResponseEntity<List<PostEncryptedGroupHourStatistics>> getAllHours(@PathVariable long datapoints) {
		var obj = statisticsPostEncryptedGroupService.getAllHours(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/24h")
	@Operation(
			summary = "Get datapoints of 24h data",
			description = "Get all datapoints of 24h data."
	)
	public ResponseEntity<List<PostEncryptedGroup24hStatistics>> getAll24hs(@PathVariable long datapoints) {
		var obj = statisticsPostEncryptedGroupService.getAll24h(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/weeks")
	@Operation(
			summary = "Get datapoints of weeks data",
			description = "Get all datapoints of weeks data."
	)
	public ResponseEntity<List<PostEncryptedGroupWeekStatistics>> getAllWeeks(@PathVariable long datapoints) {
		var obj = statisticsPostEncryptedGroupService.getAllWeeks(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/months")
	@Operation(
			summary = "Get datapoints of months data",
			description = "Get all datapoints of months data."
	)
	public ResponseEntity<List<PostEncryptedGroupMonthStatistics>> getAllMonths(@PathVariable long datapoints) {
		var obj = statisticsPostEncryptedGroupService.getAllMonths(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
}
