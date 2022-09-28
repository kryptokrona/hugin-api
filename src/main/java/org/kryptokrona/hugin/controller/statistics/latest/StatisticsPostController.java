package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.http.StatisticsResponse;
import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsPostController.VERSION;

/**
 * Statistics Post Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data.")
public class StatisticsPostController {

	static final String VERSION = "1";

	private final PostService postService;

	@Autowired
	public StatisticsPostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping("/24h")
	@Operation(
			summary = "Amount of posts during last 24h",
			description = "Gets the total amount of posts during last 24h."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmount24h() {
		return new ResponseEntity<>(
				new StatisticsResponse(postService.getTotalItemsBy24h()),
				HttpStatus.OK);
	}

	@GetMapping("/week")
	@Operation(
			summary = "Amount of posts during last week",
			description = "Gets the total amount of posts during last week."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountWeek() {
		return new ResponseEntity<>(
				new StatisticsResponse(postService.getTotalItemsByWeek()),
				HttpStatus.OK);
	}

	@GetMapping("/month")
	@Operation(
			summary = "Amount of posts during last month",
			description = "Gets the total amount of posts during last month."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountMonth() {
		return new ResponseEntity<>(
				new StatisticsResponse(postService.getTotalItemsByMonth()),
				HttpStatus.OK);
	}

	@GetMapping("/year")
	@Operation(
			summary = "Amount of posts during last year",
			description = "Gets the total amount of posts during last year."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountYear() {
		return new ResponseEntity<>(
				new StatisticsResponse(postService.getTotalItemsByYear()),
				HttpStatus.OK);
	}

}