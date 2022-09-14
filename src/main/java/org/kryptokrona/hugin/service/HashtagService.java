package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.repository.HashtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Represents a Hashtag Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HashtagService {

	@Autowired
	private HashtagRepository hashtagRepository;

	public Page<Hashtag> getAll(int page, int size) {
		Page<Hashtag> pageTuts = null;
		Pageable paging = PageRequest.of(page, size);

		return hashtagRepository.findAll(paging);
	}
}