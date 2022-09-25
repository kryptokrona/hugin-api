package org.kryptokrona.hugin.controller.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.kryptokrona.hugin.controller.latest.HashtagController.VERSION;

/**
 * Post Encrypted Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/posts-encrypted")
@Tag(name = "encrypted posts", description = "Set of endpoints to get data of encrypted posts.")
public class PostEncryptedController {

	static final String VERSION = "1";

	private final PostEncryptedService postEncryptedService;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedController.class);

	@Autowired
	public PostEncryptedController(PostEncryptedService postEncryptedService) {
		this.postEncryptedService = postEncryptedService;
	}

	@GetMapping
	@Operation(summary = "Get all encrypted posts", description = "Get all encrypted posts with pagination.")
	public ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "25") int size,
			@RequestParam(required = false, defaultValue = "desc") String order
	) {
		var pagination = postEncryptedService.getAll(page, size, order);

		Map<String, Object> response = new HashMap<>();
		response.put("encrypted_posts", pagination);
		response.put("current_page", pagination.getNumber());
		response.put("total_items", pagination.getTotalElements());
		response.put("total_pages", pagination.getTotalPages());

		logger.info("Getting all encrypted posts was successful");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("{id}")
	@Operation(
			summary = "Get a specific encrypted post by ID",
			description = "Get a specific encrypted post by ID."
	)
	public ResponseEntity<PostEncrypted> getById(@PathVariable long id) {
		var obj = postEncryptedService.getById(id);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@GetMapping("{txHash}")
	@Operation(
			summary = "Get a specific encrypted post by transaction hash",
			description = "Get a specific encrypted post by transaction hash."
	)
	public ResponseEntity<PostEncrypted> getByTxHash(@PathVariable String txHash) {
		var obj = postEncryptedService.getByTxHash(txHash);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
}