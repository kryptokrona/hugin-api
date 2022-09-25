package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.kryptokrona.hugin.repository.PostEncryptedGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

	private final PostEncryptedGroupRepository postEncryptedGroupRepository;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedGroupService.class);

	@Autowired
	public PostEncryptedGroupService(PostEncryptedGroupRepository postEncryptedGroupRepository) {
		this.postEncryptedGroupRepository = postEncryptedGroupRepository;
	}

	public Page<PostEncryptedGroup> getAll(int page, int size, String order, Long startUnixTime, Long endUnixTime) {
		PageRequest paging;

		if (Objects.equals(order, "asc".toLowerCase())) {
			paging = PageRequest.of(page, size, Sort.by("id").ascending());

			if (startUnixTime == null && endUnixTime == null) {
				return postEncryptedGroupRepository.findAll(paging);
			}

			return postEncryptedGroupRepository.findAllByTimeBetween(paging, startUnixTime, endUnixTime);
		}

		paging = PageRequest.of(page, size, Sort.by("id").descending());

		if (startUnixTime == null && endUnixTime == null) {
			return postEncryptedGroupRepository.findAll(paging);
		}

		return postEncryptedGroupRepository.findAllByTimeBetween(paging, startUnixTime, endUnixTime);
	}

	public PostEncryptedGroup getById(long id) {
		if (postEncryptedGroupRepository.existsById(id)) {
			PostEncryptedGroup postEncryptedGroup = postEncryptedGroupRepository.findById(id).get();
			logger.info("Encrypted group post found with ID: " + id);
			return postEncryptedGroup;
		}

		logger.info("Unable to find encrypted group post with ID: " + id);

		return null;
	}

	public PostEncryptedGroup getByTxHash(String txHash) {
		if (postEncryptedGroupRepository.existsPostEncryptedGroupByTxHash(txHash)) {
			PostEncryptedGroup postEncryptedGroup = postEncryptedGroupRepository.findPostEncryptedGroupByTxHash(txHash);
			logger.info("Encrypted group post found with tx hash: " + postEncryptedGroup.getTxHash());
			return postEncryptedGroup;
		}

		logger.info("Unable to find encrypted group post with tx hash: " + txHash);

		return null;
	}

	public boolean existsByTxHash(String txHash) {
		return postEncryptedGroupRepository.existsPostEncryptedGroupByTxHash(txHash);
	}

	public boolean existsByTxSb(String txSb) {
		return postEncryptedGroupRepository.existsPostEncryptedGroupByTxSb(txSb);
	}

	public void save(PostEncryptedGroup postEncryptedGroup) {
		try {
			postEncryptedGroupRepository.save(postEncryptedGroup);
			logger.info("Encrypted group post with tx hash was added: " + postEncryptedGroup.getTxHash());
		} catch (Exception e) {
			logger.error("Unable to add encrypted group post with tx hash: " + postEncryptedGroup.getTxHash());
		}
	}

}
