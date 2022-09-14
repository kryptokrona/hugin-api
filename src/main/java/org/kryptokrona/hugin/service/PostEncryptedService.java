package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Represents a Post Encrypted Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedService {

	@Autowired
	private PostEncryptedRepository postEncryptedRepository;

	public Page<PostEncrypted> getAll(int page, int size) {
		Page<PostEncrypted> pageTuts = null;
		Pageable paging = PageRequest.of(page, size);

		return postEncryptedRepository.findAll(paging);
	}
}