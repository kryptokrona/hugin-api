package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.http.StatisticsResponse;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsPostEncryptedController.VERSION;

/**
 * Statistics Post Encrypted Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data.")
public class StatisticsPostEncryptedController {

	static final String VERSION = "1";

	private final PostEncryptedService postEncryptedService;

	@Autowired
	public StatisticsPostEncryptedController(PostEncryptedService postEncryptedService) {
		this.postEncryptedService = postEncryptedService;
	}

	@GetMapping("/24h")
	@Operation(
			summary = "Amount of encrypted posts during last 24h",
			description = "Gets the total amount of encrypted posts during last 24h."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmount24h() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedService.getTotalItemsBy24h()),
				HttpStatus.OK);
	}

	@GetMapping("/week")
	@Operation(
			summary = "Amount of encrypted posts during last week",
			description = "Gets the total amount of encrypted posts during last week."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountWeek() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedService.getTotalItemsByWeek()),
				HttpStatus.OK);
	}

	@GetMapping("/month")
	@Operation(
			summary = "Amount of encrypted posts during last month",
			description = "Gets the total amount of encrypted posts during last month."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountMonth() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedService.getTotalItemsByMonth()),
				HttpStatus.OK);
	}

	@GetMapping("/year")
	@Operation(
			summary = "Amount of encrypted posts during last year",
			description = "Gets the total amount of encrypted posts during last year."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountYear() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedService.getTotalItemsByYear()),
				HttpStatus.OK);
	}

}
