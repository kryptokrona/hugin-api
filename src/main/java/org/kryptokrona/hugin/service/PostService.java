package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.repository.HashtagRepository;
import org.kryptokrona.hugin.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Post Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostService {

    private final PostRepository postRepository;

    private final HashtagRepository hashtagRepository;

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    public PostService(PostRepository postRepository, HashtagRepository hashtagRepository) {
        this.postRepository = postRepository;
        this.hashtagRepository = hashtagRepository;
    }

    public Page<Post> getAll(int page, int size, String order, boolean avatar) {
        return getAll(page, size, order,0, 0, avatar);
    }

    public Page<Post> getAll(int page, int size, String order, long startUnixTime, long endUnixTime, boolean avatar) {
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

    public Post getById(long id) {
        if (postRepository.existsById(id)) {
            Post post = postRepository.findById(id).get();
            logger.info("Post found with ID: " + id);
            return post;
        }

        logger.info("Unable to find post with ID: " + id);

        return null;
    }

    public Post getByTxHash(String txHash) {
        if (postRepository.existsPostByTxHash(txHash)) {
            Post post = postRepository.findPostByTxHash(txHash);
            logger.info("Post found with tx hash: " + post.getTxHash());
            return post;
        }

        logger.info("Unable to find post with tx hash: " + txHash);

        return null;
    }

    public boolean existsTxHash(String txHash) {
        return postRepository.existsPostByTxHash(txHash);
    }

    public void save(Post post) {
        try {
            postRepository.save(post);

            List<String> hashtagList = new ArrayList<>();
            Matcher matcher = Pattern.compile("\\B#\\w+").matcher(post.getMessage());

            while (matcher.find()) {
                hashtagList.add(matcher.group());
                System.out.println(matcher.group());
            }

            // var hashtag = new Hashtag();
            // hashtag.setName();

            logger.info("Post with tx hash was added: " + post.getTxHash());
        } catch (Exception e) {
            logger.error("Unable to add post with tx hash: " + post.getTxHash());
        }
    }

}
