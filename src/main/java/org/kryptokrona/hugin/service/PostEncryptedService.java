package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
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
 * Post Encrypted Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedService {

	private PostEncryptedRepository postEncryptedRepository;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedService.class);

	@Autowired
	public PostEncryptedService(PostEncryptedRepository postEncryptedRepository) {
		this.postEncryptedRepository = postEncryptedRepository;
	}

	public Page<PostEncrypted> getAll(int page, int size, String order) {
		if (Objects.equals(order, "asc".toLowerCase())) {
			var paging = PageRequest.of(page, size, Sort.by("id").ascending());
			return postEncryptedRepository.findAll(paging);
		}

		var paging = PageRequest.of(page, size, Sort.by("id").descending());
		return postEncryptedRepository.findAll(paging);
	}

	public PostEncrypted getById(long id) {
		if (postEncryptedRepository.existsById(id)) {
			PostEncrypted postEncrypted = postEncryptedRepository.findById(id).get();
			logger.info("Encrypted post found with ID: " + id);
			return postEncrypted;
		}

		logger.info("Unable to find encrypted post with ID: " + id);

		return null;
	}

	public boolean exists(String txHash) {
		return postEncryptedRepository.existsPostByTxHash(txHash);
	}

	public void save(PostEncrypted postEncrypted) {
		try {
			postEncryptedRepository.save(postEncrypted);
			logger.info("Encrypted post with tx hash was added: " + postEncrypted.getTxHash());
		} catch (Exception e) {
			logger.error("Unable to add encrypted post with tx hash: " + postEncrypted.getTxHash());
		}
	}

}