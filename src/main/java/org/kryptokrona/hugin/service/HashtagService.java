package org.kryptokrona.hugin.service;

import org.apache.commons.lang3.time.DateUtils;
import org.kryptokrona.hugin.model.Hashtag;
import org.kryptokrona.hugin.repository.HashtagRepository;
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
 * Hashtag Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HashtagService {

	private final HashtagRepository hashtagRepository;

	private final WebSocketService webSocketService;

	private static final Logger logger = LoggerFactory.getLogger(HashtagService.class);

	@Autowired
	public HashtagService(HashtagRepository hashtagRepository, WebSocketService webSocketService) {
		this.hashtagRepository = hashtagRepository;
		this.webSocketService = webSocketService;
	}

	public Page<Hashtag> getAll(int page, int size, String order) {
		if (Objects.equals(order, "asc".toLowerCase())) {
			var paging = PageRequest.of(page, size, Sort.by("id").ascending());
			return hashtagRepository.findAll(paging);
		}

		var paging = PageRequest.of(page, size, Sort.by("id").descending());
		return hashtagRepository.findAll(paging);
	}

	/*public Page<Hashtag> getAllTrending(int page, int size, String order) {
		PageRequest paging;

		if (Objects.equals(order, "asc".toLowerCase())) {
			paging = PageRequest.of(page, size, Sort.by("id").ascending());

			return hashtagRepository.findAllTrending(paging);
		}

		paging = PageRequest.of(page, size, Sort.by("id").descending());

		return hashtagRepository.findAllTrending(paging);
	}*/

	public Hashtag getById(long id) {
		if (hashtagRepository.existsById(id)) {
			Hashtag hashtag = hashtagRepository.findById(id).get();
			logger.info("Hashtag found with ID: " + id);
			return hashtag;
		}

		logger.info("Unable to find hashtag with ID: " + id);

		return null;
	}

	public Hashtag getByName(String name) {
		if (hashtagRepository.existsHashtagByName(name)) {
			Hashtag hashtag = hashtagRepository.findHashtagByName(name);
			logger.info("Hashtag found with name: " + name);
			return hashtag;
		}

		logger.info("Unable to find hashtag with name: " + name);

		return null;
	}

	public long getTotalItemsBy10M() {
		var endDate = new Date();
		var startDate = DateUtils.addMinutes(new Date(), -10);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByHour() {
		var endDate = new Date();
		var startDate = DateUtils.addHours(new Date(), -1);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsBy24h() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -1);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByWeek() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -7);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByMonth() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -31);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItemsByYear() {
		var endDate = new Date();
		var startDate = DateUtils.addDays(new Date(), -365);
		var items = hashtagRepository.findAllByCreatedAtBetween(startDate, endDate);

		return items.size();
	}

	public long getTotalItems() {
		var items = hashtagRepository.findAll();

		return items.size();
	}

	public boolean existsByName(String hashtagName) {
		return hashtagRepository.existsHashtagByName(hashtagName);
	}

	public void save(Hashtag hashtag) {
		try {
			hashtagRepository.save(hashtag);
			webSocketService.notifyNewHashtag(hashtag);
			logger.info("Hashtag with name was added: " + hashtag.getName());
		} catch (Exception e) {
			logger.error("Unable to add hashtag with name: " + hashtag.getName());
		}
	}
 }