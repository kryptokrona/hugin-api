package org.kryptokrona.hugin.controller.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.service.HashtagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Version;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.kryptokrona.hugin.controller.latest.HashtagController.VERSION;

/**
 * Hashtag Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/hashtags")
@Tag(name = "hashtags", description = "Set of endpoints to get data of hashtags.")
public class HashtagController {

	static final String VERSION = "1";

	private final HashtagService hashtagService;

	private static final Logger logger = LoggerFactory.getLogger(HashtagController.class);

	@Autowired
	public HashtagController(HashtagService hashtagService) {
		this.hashtagService = hashtagService;
	}

	/**
	 * Get all hashtags.
	 *
	 * @param page The page number
	 * @param size The total amount of entries per page
	 * @param order The order in form av desc/asc
	 * @return ResponseEntity
	 */
	@GetMapping
	@Operation(summary = "Get all hashtags", description = "Get all hashtags with pagination.")
	public ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "25") int size,
			@RequestParam(required = false, defaultValue = "desc") String order
	) {
		var pagination = hashtagService.getAll(page, size, order);

		Map<String, Object> response = new HashMap<>();
		response.put("hashtags", pagination);
		response.put("current_page", pagination.getNumber());
		response.put("total_items", pagination.getTotalElements());
		response.put("total_pages", pagination.getTotalPages());

		logger.info("Getting all hashtags was successful");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	/**
	 * Get a specific hashtag by ID.
	 *
	 * @param id The id to look for.
	 * @return Returns the specific hashtag.
	 */
	@GetMapping("{id}")
	@Operation(
			summary = "Get a specific hashtag by ID",
			description = "Get a specific hashtag by ID."
	)
	public ResponseEntity<Hashtag> getById(@PathVariable long id) {
		var obj = hashtagService.getById(id);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
}
