package org.kryptokrona.hugin.controller.statistics.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.http.StatisticsResponse;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.kryptokrona.hugin.controller.statistics.latest.StatisticsPostEncryptedGroupController.VERSION;

/**
 * Statistics Post Encrypted Group Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics/posts-encrypted-group")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data.")
public class StatisticsPostEncryptedGroupController {

	static final String VERSION = "1";

	private final PostEncryptedGroupService postEncryptedGroupService;

	@Autowired
	public StatisticsPostEncryptedGroupController(PostEncryptedGroupService postEncryptedGroupService1) {
		this.postEncryptedGroupService = postEncryptedGroupService1;
	}

	@GetMapping("/24h")
	@Operation(
			summary = "Amount of encrypted group posts during last 24h",
			description = "Gets the total amount of encrypted group posts during last 24h."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmount24h() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedGroupService.getTotalItemsBy24h()),
				HttpStatus.OK);
	}

	@GetMapping("/week")
	@Operation(
			summary = "Amount of encrypted group posts during last week",
			description = "Gets the total amount of encrypted group posts during last week."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountWeek() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedGroupService.getTotalItemsByWeek()),
				HttpStatus.OK);
	}

	@GetMapping("/month")
	@Operation(
			summary = "Amount of encrypted group posts during last month",
			description = "Gets the total amount of encrypted group posts during last month."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountMonth() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedGroupService.getTotalItemsByMonth()),
				HttpStatus.OK);
	}

	@GetMapping("/year")
	@Operation(
			summary = "Amount of encrypted group posts during last year",
			description = "Gets the total amount of encrypted group posts during last year."
	)
	public ResponseEntity<StatisticsResponse> getTotalAmountYear() {
		return new ResponseEntity<>(
				new StatisticsResponse(postEncryptedGroupService.getTotalItemsByYear()),
				HttpStatus.OK);
	}

}
