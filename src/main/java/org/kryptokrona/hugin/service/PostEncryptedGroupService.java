package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.kryptokrona.hugin.repository.PostEncryptedGroupRepository;
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
 * Post Encrypted Group Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedGroupService {

	private PostEncryptedGroupRepository postEncryptedGroupRepository;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedGroupService.class);

	@Autowired
	public PostEncryptedGroupService(PostEncryptedGroupRepository postEncryptedGroupRepository) {
		this.postEncryptedGroupRepository = postEncryptedGroupRepository;
	}

	/**
	 * Get all encrypted group posts with pagination.
	 *
	 * @param page The current page.
	 * @param size The size per page.
	 * @param order desc or asc order.
	 * @return Returns all encrypted group posts with pagination.
	 */
	public Page<PostEncryptedGroup> getAll(int page, int size, String order) {
		if (Objects.equals(order, "asc".toLowerCase())) {
			var paging = PageRequest.of(page, size, Sort.by("id").ascending());
			return postEncryptedGroupRepository.findAll(paging);
		}

		var paging = PageRequest.of(page, size, Sort.by("id").descending());
		return postEncryptedGroupRepository.findAll(paging);
	}

	/**
	 * Get encrypted group post by id.
	 *
	 * @param id The id to look for in the database.
	 * @return Returns the encrypted group post object.
	 */
	public PostEncryptedGroup getById(long id) {
		if (postEncryptedGroupRepository.existsById(id)) {
			PostEncryptedGroup postEncryptedGroup = postEncryptedGroupRepository.findById(id).get();
			logger.info("Encrypted group post found with ID: " + id);
			return postEncryptedGroup;
		}

		logger.info("Unable to find encrypted group post with ID: " + id);

		return null;
	}

	/**
	 * Checks if the encrypted group post exists in the database.
	 *
	 * @param txHash The unique transaction hash connected to the encrypted group post object
	 * @return Returns if it exists or not
	 */
	public boolean exists(String txHash) {
		return postEncryptedGroupRepository.existsPostByTxHash(txHash);
	}

	/**
	 * Saves the encrypted group post to the database.
	 *
	 * @param postEncryptedGroup The encrypted group post object to save.
	 */
	public void save(PostEncryptedGroup postEncryptedGroup) {
		try {
			postEncryptedGroupRepository.save(postEncryptedGroup);
			logger.info("Encrypted group post with tx hash was added: " + postEncryptedGroup.getTxHash());
		} catch (Exception e) {
			logger.error("Unable to add encrypted group post with tx hash: " + postEncryptedGroup.getTxHash());
		}
	}

}
