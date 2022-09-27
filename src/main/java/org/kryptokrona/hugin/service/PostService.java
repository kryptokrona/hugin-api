package org.kryptokrona.hugin.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
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

    private final HashtagService hashtagService;

    private final WebSocketService webSocketService;

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    public PostService(PostRepository postRepository, HashtagService hashtagService, WebSocketService webSocketService) {
        this.postRepository = postRepository;
        this.hashtagService = hashtagService;
        this.webSocketService = webSocketService;
    }

    public Page<Post> getAll(int page, int size, String order, Long startUnixTime, Long endUnixTime, boolean avatar) {
        PageRequest paging;

        if (Objects.equals(order, "asc".toLowerCase())) {
            paging = PageRequest.of(page, size, Sort.by("id").ascending());

            if (startUnixTime == null && endUnixTime == null) {
                return avatar ?
                        postRepository.findAll(paging) :
                        postRepository.findAllExcludeAvatar(paging);
            }

            return avatar ?
                    postRepository.findAllByTimeBetween(paging, startUnixTime, endUnixTime) :
                    postRepository.findAllExcludeAvatar(paging);
        }

        paging = PageRequest.of(page, size, Sort.by("id").descending());

        if (startUnixTime == null && endUnixTime == null) {
            return avatar ?
                    postRepository.findAll(paging) :
                    postRepository.findAllExcludeAvatar(paging);
        }

        return avatar ?
                postRepository.findAllByTimeBetween(paging, startUnixTime, endUnixTime) :
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
            Set<Hashtag> hashtagList = new HashSet<>();
            Matcher matcher = Pattern.compile("\\B#\\w+").matcher(post.getMessage());

            // if we find matches of hashtags in message
            while (matcher.find()) {

                var hashtagName = matcher.group().replaceAll("#", "");

                // create one if it doesn't already exist in db
                if (hashtagService.existsByName(hashtagName)) {
                    logger.debug("Hashtag already exists in db, skipping.");
                } else {
                    var hashtagObj = new Hashtag();
                    hashtagObj.setName(hashtagName);
                    hashtagService.save(hashtagObj);

                    hashtagList.add(hashtagObj);
                }
            }

            post.setHashtags(new ArrayList<>(hashtagList));
            postRepository.save(post);

            webSocketService.notifyNewPost(post);

            logger.info("Post with tx hash was added: " + post.getTxHash());
        } catch (Exception e) {
            logger.error("Unable to add post with tx hash: " + post.getTxHash());
        }
    }

}
