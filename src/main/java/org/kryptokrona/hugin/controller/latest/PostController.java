package org.kryptokrona.hugin.controller.latest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.service.PostService;
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
 * Post Controller.
 *
 * @author Marcus Cvjeticanin
 */
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v" + VERSION + "/posts")
@Tag(name = "posts", description = "Set of endpoints to get data of posts.")
public class PostController {

    static final String VERSION = "1";

    private final PostService postService;

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    /**
     * Get all posts.
     *
     * @param page The page number
     * @param size The total amount of entries per page
     * @param order The order in form av desc/asc
     * @param avatar If the avatar field be included
     * @return ResponseEntity
     */
    @GetMapping
    @Operation(summary = "Get all posts", description = "Get all posts with pagination.")
    public ResponseEntity<Map<String, Object>> getAll(
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "25") int size,
      @RequestParam(required = false, defaultValue = "desc") String order,
      @RequestParam(required = false, defaultValue = "false") boolean avatar
    ) {
        var pagination = postService.getAll(page, size, order, avatar);

        Map<String, Object> response = new HashMap<>();
        response.put("posts", pagination);
        response.put("current_page", pagination.getNumber());
        response.put("total_items", pagination.getTotalElements());
        response.put("total_pages", pagination.getTotalPages());

        logger.info("Getting all posts was successful");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get a specific post by ID.
     *
     * @param id The id to look for.
     * @return Returns the specific post.
     */
    @GetMapping("{id}")
    @Operation(
            summary = "Get a specific post by ID",
            description = "Get a specific post by ID."
    )
    public ResponseEntity<Post> getById(@PathVariable long id) {
        var obj = postService.getById(id);

        if (obj == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
}