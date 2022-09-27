package org.kryptokrona.hugin.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

	private static final String WS_HASHTAG_TRANSFER_DESTINATION = "/topic/hashtags";

	private static final String WS_POST_TRANSFER_DESTINATION = "/topic/posts";

	private static final String WS_POST_ENCRYPTED_TRANSFER_DESTINATION = "/topic/posts-encrypted";

	private static final String WS_POST_ENCRYPTED_GROUP_TRANSFER_DESTINATION = "/topic/posts-encrypted-group";

	private final SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	public WebSocketService(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	public void notifyNewHashtag(final Hashtag hashtag) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String objAsStr = objectMapper.writeValueAsString(hashtag);

		simpMessagingTemplate.convertAndSend(WS_HASHTAG_TRANSFER_DESTINATION, objAsStr);
	}

	public void notifyNewPost(final Post post) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String objAsStr = objectMapper.writeValueAsString(post);

		simpMessagingTemplate.convertAndSend(WS_POST_TRANSFER_DESTINATION, objAsStr);
	}

	public void notifyNewPostEncrypted(final PostEncrypted postEncrypted) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String objAsStr = objectMapper.writeValueAsString(postEncrypted);

		simpMessagingTemplate.convertAndSend(WS_POST_ENCRYPTED_TRANSFER_DESTINATION, objAsStr);
	}

	public void notifyNewPostEncryptedGroup(final PostEncryptedGroup postEncryptedGroup) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String objAsStr = objectMapper.writeValueAsString(postEncryptedGroup);

		simpMessagingTemplate.convertAndSend(WS_POST_ENCRYPTED_GROUP_TRANSFER_DESTINATION, objAsStr);
	}

}
