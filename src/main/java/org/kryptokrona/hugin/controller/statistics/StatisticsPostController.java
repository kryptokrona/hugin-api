package org.kryptokrona.hugin.controller.statistics;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.model.statistics.*;
import org.kryptokrona.hugin.service.statistics.StatisticsPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.kryptokrona.hugin.controller.statistics.StatisticsPostController.VERSION;

/**
 * Statistics Post Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts")
@Tag(name = "statistics", description = "Set of endpoints to get data of posts.")
public class StatisticsPostController {

	static final String VERSION = "1";

	private final StatisticsPostService statisticsPostService;

	@Autowired
	public StatisticsPostController(StatisticsPostService statisticsPostService) {
		this.statisticsPostService = statisticsPostService;
	}

	@GetMapping("/datapoints/10m")
	@Operation(
			summary = "Get datapoints of 10 minutes data",
			description = "Get all datapoints of 10 minutes data."
	)
	public ResponseEntity<List<Post10MStatistics>> getAll10m(@RequestParam Integer datapoints) {
		var obj = statisticsPostService.getAll10m(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/hours")
	@Operation(
			summary = "Get datapoints of hours data",
			description = "Get all datapoints of hours data."
	)
	public ResponseEntity<List<PostHourStatistics>> getAllHours(@RequestParam Integer datapoints) {
		var obj = statisticsPostService.getAllHours(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/24h")
	@Operation(
			summary = "Get datapoints of 24h data",
			description = "Get all datapoints of 24h data."
	)
	public ResponseEntity<List<Post24hStatistics>> getAll24hs(@RequestParam Integer datapoints) {
		var obj = statisticsPostService.getAll24h(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/weeks")
	@Operation(
			summary = "Get datapoints of weeks data",
			description = "Get all datapoints of weeks data."
	)
	public ResponseEntity<List<PostWeekStatistics>> getAllWeeks(@RequestParam Integer datapoints) {
		var obj = statisticsPostService.getAllWeeks(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("/datapoints/months")
	@Operation(
			summary = "Get datapoints of months data",
			description = "Get all datapoints of months data."
	)
	public ResponseEntity<List<PostMonthStatistics>> getAllMonths(@PathVariable Integer datapoints) {
		var obj = statisticsPostService.getAllMonths(datapoints);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

}
