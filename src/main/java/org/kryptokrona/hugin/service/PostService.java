package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Post Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    public Page<Post> getAll(int page, int size) {
        Page<Post> pageTuts = null;
        Pageable paging = PageRequest.of(page, size);

        return postRepository.findAll(paging);
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
