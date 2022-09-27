package org.kryptokrona.hugin.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kryptokrona.hugin.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

	private static final String WS_POST_TRANSFER_DESTINATION = "/topic/posts";

	private final SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	public WebSocketService(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	public void notifyNewPost(final Post post) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String carAsString = objectMapper.writeValueAsString(post);

		simpMessagingTemplate.convertAndSend(WS_POST_TRANSFER_DESTINATION, carAsString);
	}

}
