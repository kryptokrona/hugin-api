package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Post Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostService {

    private PostRepository postRepository;

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /**
     * Get all posts with pagination.
     *
     * @param page The page number
     * @param size The total amount of entries per page
     * @param order The order in form av desc/asc
     * @return Returns all posts with pagination.
     */
    public Page<Post> getAll(int page, int size, String order, boolean avatar) {
        if (Objects.equals(order, "asc".toLowerCase())) {
            var paging = PageRequest.of(page, size, Sort.by("id").ascending());
            return avatar ?
                    postRepository.findAll(paging) :
                    postRepository.findAllExcludeAvatar(paging);
        }

        var paging = PageRequest.of(page, size, Sort.by("id").descending());
        return avatar ?
                postRepository.findAll(paging) :
                postRepository.findAllExcludeAvatar(paging);
    }

    /**
     * Get post by id.
     *
     * @param id The id to look for in the database.
     * @return Returns the post object.
     */
    public Post getById(long id) {
        if (postRepository.existsById(id)) {
            Post post = postRepository.findById(id).get();
            logger.info("Post found with ID: " + id);
            return post;
        }

        logger.info("Unable to find post with ID: " + id);

        return null;
    }

    /**
     * Checks if the post exists in the database.
     *
     * @param txHash The unique transaction hash connected to the post object
     * @return Returns if it exists or not
     */
    public boolean exists(String txHash) {
        return postRepository.existsPostByTxHash(txHash);
    }

    /**
     * Saves the post to the database.
     *
     * @param post The post object to save.
     */
    public void save(Post post) {
        try {
            postRepository.save(post);
            logger.info("Post with tx hash was added: " + post.getTxHash());
        } catch (Exception e) {
            logger.error("Unable to add post with tx hash: " + post.getTxHash());
        }
    }

}
