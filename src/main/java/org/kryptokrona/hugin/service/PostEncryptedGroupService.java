package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.kryptokrona.hugin.repository.PostEncryptedGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Post Encrypted Group Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostEncryptedGroupService {

	@Autowired
	private PostEncryptedGroupRepository postEncryptedGroupRepository;

	public Page<PostEncryptedGroup> getAll(int page, int size) {
		Page<PostEncryptedGroup> pageTuts = null;
		Pageable paging = PageRequest.of(page, size);

		return postEncryptedGroupRepository.findAll(paging);
	}

	/**
	 * Checks if the encrypted group post exists in the database.
	 *
	 * @param txHash The unique transaction hash connected to the encrypted group post object
	 * @return Returns if it exists or not
	 */
	public boolean encryptedGroupPostExists(String txHash) {
		return postEncryptedGroupRepository.existsPostByTxHash(txHash);
	}

	public void saveEncryptedGroupPost() {

	}

}
