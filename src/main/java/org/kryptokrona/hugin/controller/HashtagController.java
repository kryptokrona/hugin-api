package org.kryptokrona.hugin.controller;

import org.kryptokrona.hugincache.service.HashtagService;
import org.kryptokrona.hugincache.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Represents a Hashtag Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/hashtags")
// @Tag(name = "posts", description = "Set of endpoints to get data of posts.")
public class HashtagController {

	@Autowired
	private HashtagService hashtagService;

	private static final Logger logger = LoggerFactory.getLogger(HashtagController.class);

	/**
	 * Get all hashtags.
	 *
	 * @param page : int
	 * @param size : int
	 * @return ResponseEntity
	 */
	@GetMapping
	// @Operation(summary = "Get all cryptocurrencies", description = "Get all posts with pagination.")
	public ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "25") int size
	) {
		var pagination = hashtagService.getAll(page, size);

		Map<String, Object> response = new HashMap<>();
		response.put("hashtags", pagination);
		response.put("current_page", pagination.getNumber());
		response.put("total_items", pagination.getTotalElements());
		response.put("total_pages", pagination.getTotalPages());

		logger.info("Getting all hashtags was successful");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
