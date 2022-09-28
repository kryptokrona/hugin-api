package org.kryptokrona.hugin.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.http.StatisticsResponse;
import org.kryptokrona.hugin.service.HashtagService;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.kryptokrona.hugin.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.kryptokrona.hugin.controller.StatisticsController.VERSION;

/**
 * Statistics Post Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/statistics")
@Tag(name = "statistics", description = "Set of endpoints to get statistical data.")
public class StatisticsController {

	static final String VERSION = "1";

	private final PostService postService;

	private final PostEncryptedService postEncryptedService;

	private final PostEncryptedGroupService postEncryptedGroupService;

	private final HashtagService hashtagService;

	@Autowired
	public StatisticsController(
			PostService postService,
			PostEncryptedService postEncryptedService,
			PostEncryptedGroupService postEncryptedGroupService,
			HashtagService hashtagService
	) {
		this.postService = postService;
		this.postEncryptedService = postEncryptedService;
		this.postEncryptedGroupService = postEncryptedGroupService;
		this.hashtagService = hashtagService;
	}

	@GetMapping("/posts")
	@Operation(
			summary = "Amount of posts",
			description = "Gets the total amount of posts during last 24h/week/month/year."
	)
	public ResponseEntity<StatisticsResponse> getPostStatistics() {
		var statisticsResponseObj = new StatisticsResponse();
		statisticsResponseObj.setTwentyFourHours(postService.getTotalItemsBy24h());
		statisticsResponseObj.setWeek(postService.getTotalItemsByWeek());
		statisticsResponseObj.setMonth(postService.getTotalItemsByMonth());
		statisticsResponseObj.setYear(postService.getTotalItemsByYear());

		return new ResponseEntity<>(statisticsResponseObj, HttpStatus.OK);
	}

	@GetMapping("/posts-encrypted")
	@Operation(
			summary = "Amount of encrypted group posts",
			description = "Gets the total amount of encrypted group posts during last 24h/week/month/year."
	)
	public ResponseEntity<StatisticsResponse> getPostEncryptedStatistics() {
		var statisticsResponseObj = new StatisticsResponse();
		statisticsResponseObj.setTwentyFourHours(postEncryptedService.getTotalItemsBy24h());
		statisticsResponseObj.setWeek(postEncryptedService.getTotalItemsByWeek());
		statisticsResponseObj.setMonth(postEncryptedService.getTotalItemsByMonth());
		statisticsResponseObj.setYear(postEncryptedService.getTotalItemsByYear());

		return new ResponseEntity<>(statisticsResponseObj, HttpStatus.OK);
	}

	@GetMapping("/post-encrypted-group")
	@Operation(
			summary = "Amount of encrypted posts",
			description = "Gets the total amount of encrypted posts during last 24h/week/month/year."
	)
	public ResponseEntity<StatisticsResponse> getPostEncryptedGroupStatistics() {
		var statisticsResponseObj = new StatisticsResponse();
		statisticsResponseObj.setTwentyFourHours(postEncryptedGroupService.getTotalItemsBy24h());
		statisticsResponseObj.setWeek(postEncryptedGroupService.getTotalItemsByWeek());
		statisticsResponseObj.setMonth(postEncryptedGroupService.getTotalItemsByMonth());
		statisticsResponseObj.setYear(postEncryptedGroupService.getTotalItemsByYear());

		return new ResponseEntity<>(statisticsResponseObj, HttpStatus.OK);
	}

	@GetMapping("/hashtag")
	@Operation(
			summary = "Amount of hashtags",
			description = "Gets the total amount of hashtags during last 24h/week/month/year."
	)
	public ResponseEntity<StatisticsResponse> getHashtagStatistics() {
		var statisticsResponseObj = new StatisticsResponse();
		statisticsResponseObj.setTwentyFourHours(hashtagService.getTotalItemsBy24h());
		statisticsResponseObj.setWeek(hashtagService.getTotalItemsByWeek());
		statisticsResponseObj.setMonth(hashtagService.getTotalItemsByMonth());
		statisticsResponseObj.setYear(hashtagService.getTotalItemsByYear());

		return new ResponseEntity<>(statisticsResponseObj, HttpStatus.OK);
	}

}
