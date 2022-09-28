package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.http.StatisticsResponse;
import org.kryptokrona.hugin.service.HashtagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@Tag(name = "statistics", description = "Set of endpoints to get statistical data.")
public class StatisticsHashtagController {

	static final String VERSION = "1";

	private final HashtagService hashtagService;

	@Autowired
	public StatisticsHashtagController(HashtagService hashtagService) {
		this.hashtagService = hashtagService;
	}

	@GetMapping("/24h")
	@Operation(
			summary = "Amount of hashtags during last 24h",
			description = "Gets the total amount of hashtags during last 24h."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmount24h() {
		return new ResponseEntity<>(
				new StatisticsResponse(hashtagService.getTotalItemsBy24h()),
				HttpStatus.OK);
	}

	@GetMapping("/week")
	@Operation(
			summary = "Amount of hashtags during last week",
			description = "Gets the total amount of hashtags during last week."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountWeek() {
		return new ResponseEntity<>(
				new StatisticsResponse(hashtagService.getTotalItemsByWeek()),
				HttpStatus.OK);
	}

	@GetMapping("/month")
	@Operation(
			summary = "Amount of posts during last month",
			description = "Gets the total amount of hashtags during last month."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountMonth() {
		return new ResponseEntity<>(
				new StatisticsResponse(hashtagService.getTotalItemsByMonth()),
				HttpStatus.OK);
	}

	@GetMapping("/year")
	@Operation(
			summary = "Amount of hashtags during last year",
			description = "Gets the total amount of hashtags during last year."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountYear() {
		return new ResponseEntity<>(
				new StatisticsResponse(hashtagService.getTotalItemsByYear()),
				HttpStatus.OK);
	}

}
