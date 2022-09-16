package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.http.EncryptedPost;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Post Encrypted Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedService {

	@Autowired
	private PostEncryptedRepository postEncryptedRepository;

	private static final Logger logger = LoggerFactory.getLogger(PostEncryptedService.class);

	public Page<PostEncrypted> getAll(int page, int size) {
		Page<PostEncrypted> pageTuts = null;
		Pageable paging = PageRequest.of(page, size);

		return postEncryptedRepository.findAll(paging);
	}

	/**
	 * Checks if the encrypted post exists in the database.
	 *
	 * @param txHash The unique transaction hash connected to the encrypted post object
	 * @return Returns if it exists or not
	 */
	public boolean exists(String txHash) {
		return postEncryptedRepository.existsPostByTxHash(txHash);
	}

	/**
	 * Saves the post to the database.
	 *
	 * @param postEncrypted The encrypted post object to save.
	 */
	public void save(PostEncrypted postEncrypted) {
		try {
			postEncryptedRepository.save(postEncrypted);
			logger.info("Encrypted post with tx hash was added: " + postEncrypted.getTxHash());
		} catch (Exception e) {
			logger.error("Unable to add encrypted post with tx hash: " + postEncrypted.getTxHash());
		}
	}

}