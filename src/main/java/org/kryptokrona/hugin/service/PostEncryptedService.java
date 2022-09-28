package org.kryptokrona.hugin.service;

import org.apache.commons.lang3.time.DateUtils;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

/**
 * Post Encrypted Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedService {

	private final PostEncryptedRepository postEncryptedRepository;

	private final WebSocketService webSocketService;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedService.class);

	@Autowired
	public PostEncryptedService(PostEncryptedRepository postEncryptedRepository, WebSocketService webSocketService) {
		this.postEncryptedRepository = postEncryptedRepository;
		this.webSocketService = webSocketService;
	}

	public Page<PostEncrypted> getAll(int page, int size, String order, Long startUnixTime, Long endUnixTime) {
		PageRequest paging;

		if (Objects.equals(order, "asc".toLowerCase())) {
			paging = PageRequest.of(page, size, Sort.by("id").ascending());

			if (startUnixTime == null && endUnixTime == null) {
				return postEncryptedRepository.findAll(paging);
			}

			return postEncryptedRepository.findAllByTxTimestampBetween(paging, startUnixTime, endUnixTime);
		}

		paging = PageRequest.of(page, size, Sort.by("id").descending());

		if (startUnixTime == null && endUnixTime == null) {
			return postEncryptedRepository.findAll(paging);
		}

		return postEncryptedRepository.findAllByTxTimestampBetween(paging, startUnixTime, endUnixTime);
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

	public PostEncrypted getByTxHash(String txHash) {
		if (postEncryptedRepository.existsPostEncryptedByTxHash(txHash)) {
			PostEncrypted postEncrypted = postEncryptedRepository.findPostEncryptedByTxHash(txHash);
			logger.info("Encrypted post found with tx hash: " + postEncrypted.getTxHash());
			return postEncrypted;
		}

		logger.info("Unable to find encrypted post with tx hash: " + txHash);

		return null;
	}

	public long getTotalItemsBy24h() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -1);
		var items = postEncryptedRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByWeek() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -7);
		var items = postEncryptedRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByMonth() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -31);
		var items = postEncryptedRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByYear() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -365);
		var items = postEncryptedRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public boolean existsTxHash(String txHash) {
		return postEncryptedRepository.existsPostEncryptedByTxHash(txHash);
	}

	public boolean existsTxBox(String txBox) {
		return postEncryptedRepository.existsPostEncryptedByTxBox(txBox);
	}

	public void save(PostEncrypted postEncrypted) {
		try {
			postEncryptedRepository.save(postEncrypted);
			webSocketService.notifyNewPostEncrypted(postEncrypted);
			logger.info("Encrypted post with tx hash was added: " + postEncrypted.getTxHash());
		} catch (Exception e) {
			logger.error("Unable to add encrypted post with tx hash: " + postEncrypted.getTxHash());
		}
	}

}