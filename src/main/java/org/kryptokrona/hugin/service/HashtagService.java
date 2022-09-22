package org.kryptokrona.hugin.service;

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

	private final HashtagRepository hashtagRepository;

	private static final Logger logger = LoggerFactory.getLogger(HashtagService.class);

	@Autowired
	public HashtagService(HashtagRepository hashtagRepository) {
		this.hashtagRepository = hashtagRepository;
	}

	/**
	 * Get all hashtags with pagination.
	 *
	 * @param page The current page.
	 * @param size The size per page.
	 * @return Returns all hashtag with pagination.
	 */
	public Page<Hashtag> getAll(int page, int size) {
		Pageable paging = PageRequest.of(page, size);

		return hashtagRepository.findAll(paging);
	}

	/**
	 * Get hashtag by id.
	 *
	 * @param id The id to look for in the database.
	 * @return Returns the hashtag object.
	 */
	public Hashtag getById(long id) {
		if (hashtagRepository.existsById(id)) {
			Hashtag hashtag = hashtagRepository.findById(id).get();
			logger.info("Hashtag found with ID: " + id);
			return hashtag;
		}

		logger.info("Unable to find hashtag with ID: " + id);

		return null;
	}

	/**
	 * Checks if the hashtag exists in the database.
	 *
	 * @param name The unique name connected to the post object
	 * @return Returns if it exists or not
	 */
	public boolean exists(String name) {
		return hashtagRepository.existsHashtagByName(name);
	}

	/**
	 * Saves the hashtag to the database.
	 *
	 * @param hashtag The hashtag object to save.
	 */
	public void save(Hashtag hashtag) {
		try {
			hashtagRepository.save(hashtag);
			logger.info("Post with name was added: " + hashtag.getName());
		} catch (Exception e) {
			logger.error("Unable to add hashtag with name: " + hashtag.getName());
		}
	}
 }