package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.controller.HashtagController;
import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.repository.HashtagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Hashtag Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HashtagService {

	@Autowired
	private HashtagRepository hashtagRepository;

	private static final Logger logger = LoggerFactory.getLogger(HashtagService.class);

	public Page<Hashtag> getAll(int page, int size) {
		Page<Hashtag> pageTuts = null;
		Pageable paging = PageRequest.of(page, size);

		return hashtagRepository.findAll(paging);
	}

	public Hashtag getById(long id) {
		if (hashtagRepository.existsById(id)) {
			Hashtag hashtag = hashtagRepository.findById(id).get();
			logger.info("Hashtag found with ID: " + id);
			return hashtag;
		} else {
			logger.error("Unable to find hashtag with ID: " + id);
		}

		return null;
	}
 }