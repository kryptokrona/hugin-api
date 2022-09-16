package org.kryptokrona.hugin.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

public class PostEncryptedGroupController {

	@Autowired
	private PostEncryptedGroupService postEncryptedGroupService;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedController.class);

	/**
	 * Get all encrypted group posts.
	 *
	 * @param page : int
	 * @param size : int
	 * @return ResponseEntity
	 */
	@GetMapping
	@Operation(
			summary = "Get all encrypted group posts",
			description = "Get all encrypted group posts with pagination."
	)
	public ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "25") int size
	) {
		var pagination = postEncryptedGroupService.getAll(page, size);

		Map<String, Object> response = new HashMap<>();
		response.put("encrypted_group_posts", pagination);
		response.put("current_page", pagination.getNumber());
		response.put("total_items", pagination.getTotalElements());
		response.put("total_pages", pagination.getTotalPages());

		logger.info("Getting all encrypted group posts was successful");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("{id}")
	@Operation(
			summary = "Get a specific encrypted group post by ID",
			description = "Get a specific encrypted group post by ID."
	)
	public ResponseEntity<PostEncrypted> getById(@PathVariable long id) {
		var obj = postEncryptedGroupService.getById(id);

		if (obj == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

}
