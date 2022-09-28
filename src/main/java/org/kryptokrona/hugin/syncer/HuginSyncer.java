package org.kryptokrona.hugin.syncer;

import com.fasterxml.jackson.databind.ObjectMapper;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.apache.hc.client5.http.fluent.Content;
import org.apache.hc.client5.http.fluent.Request;
import org.kryptokrona.hugin.controller.PostController;
import org.kryptokrona.hugin.crypto.Box;
import org.kryptokrona.hugin.crypto.HuginCrypto;
import org.kryptokrona.hugin.crypto.KeyPair;
import org.kryptokrona.hugin.crypto.SealedBox;
import org.kryptokrona.hugin.http.PoolChangesLite;
import org.kryptokrona.hugin.http.PostItem;
import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.model.PostEncrypted;
import org.kryptokrona.hugin.model.PostEncryptedGroup;
import org.kryptokrona.hugin.service.PostEncryptedGroupService;
import org.kryptokrona.hugin.service.PostEncryptedService;
import org.kryptokrona.hugin.service.PostService;
import org.kryptokrona.hugin.validator.PostValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Hugin Syncer.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HuginSyncer {

	private PostService postService;

	private PostEncryptedService postEncryptedService;

	private PostEncryptedGroupService postEncryptedGroupService;

	private PostController postController;

	@Value("${SYS_NODE_HOSTNAME}")
	private String nodeHostname;

	private HostName hostname;

	private List<String> knownPoolTxsList = new ArrayList<>();

	private static final Logger logger = LoggerFactory.getLogger(HuginSyncer.class);

	@Autowired
	public HuginSyncer(
			PostService postService, PostEncryptedService postEncryptedService,
			PostEncryptedGroupService postEncryptedGroupService
	) {
		this.postService = postService;
		this.postEncryptedService = postEncryptedService;
		this.postEncryptedGroupService = postEncryptedGroupService;
	}

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.debug("Background syncing...");
		// this.brokerMessagingTemplate.convertAndSend("/user", "foo");

		hostname = new HostName(nodeHostname);

		getPoolChangesLite().subscribe(System.out::println);
	}

	/**
	 * Sends a POST request to /get_pool_changes lite
	 *
	 * @return Returns a JsonObject
	 */
	public Observable<Void> getPoolChangesLite() {
		try {
			getRequest("get_pool_changes_lite").subscribe(response -> {
				var objectMapper = new ObjectMapper();
				var reader = new StringReader(response.asString());

				PoolChangesLite poolChangesLite = objectMapper.readValue(reader, PoolChangesLite.class);

				var transactions = poolChangesLite.getAddedTxs();

				if (transactions.size() == 0) {
					logger.debug("Got empty transaction array.");
				}

				for (var transaction : transactions) {
					var thisExtra = transaction.getTransactionPrefix().getExtra();
					var txHash = transaction.getTransactionHash();

					if (!knownPoolTxsList.contains(txHash)) {
						knownPoolTxsList.add(txHash);
					} else {
						logger.debug("Transaction is already known: " + txHash);
					}

					var knownKeys = new ArrayList<String>();

					var keyPair = new KeyPair();
					keyPair.setPrivateSpendKey("0000000000000000000000000000000000000000000000000000000000000000");
					keyPair.setPrivateViewKey("0000000000000000000000000000000000000000000000000000000000000000");

					PostItem boardPost = null;

					// skipping this if extra data is less than 200 - we skip this statement
					if (thisExtra != null && thisExtra.length() > 200) {
						var extra = HuginCrypto.trimExtra(thisExtra);
						var isBoxObj = HuginCrypto.isBoxObject(extra);
						var isSealedBoxObj = HuginCrypto.isSealedBoxObject(extra);

						// encrypted post
						if (isBoxObj) {
							//TODO: some bug here, throws exception it cannot be deserialized in the box class
							var boxObj = objectMapper.readValue(new StringReader(extra), Box.class);

							var exists = postEncryptedService.existsTxBox(boxObj.getBox());

							if (!exists) {
								var postEncryptedObj = new PostEncrypted();
								postEncryptedObj.setTxBox(boxObj.getBox());
								postEncryptedObj.setTxTimestamp(boxObj.getTimestamp());
								postEncryptedObj.setTxHash(txHash);
								postEncryptedService.save(postEncryptedObj);
							}
						}

						// encrypted group post
						if (isSealedBoxObj) {
							var boxObj = objectMapper.readValue(new StringReader(extra), SealedBox.class);

							var exists = postEncryptedGroupService.existsByTxSb(boxObj.getSb());

							if (!exists) {
								var postEncryptedGroupObj = new PostEncryptedGroup();
								postEncryptedGroupObj.setTxSb(boxObj.getSb());
								postEncryptedGroupObj.setTxTimestamp(boxObj.getTimestamp());
								postEncryptedGroupObj.setTxHash(txHash);
								postEncryptedGroupService.save(postEncryptedGroupObj);
							}
						}

						if (!isBoxObj && !isSealedBoxObj) {
							// saving board post if the extra data is a post otherwise it will contain null
							boardPost = HuginCrypto.extraDataToPost(extra);
						}
					}

					if (boardPost == null) {
						logger.debug("Caught null message, skipping.");
					} else {
						logger.debug("Got 1 post. Post with tx hash: " + txHash);

						var postObj = new Post();
						postObj.setMessage(boardPost.getM());
						postObj.setKey(boardPost.getK());
						postObj.setSignature(boardPost.getS());
						postObj.setBoard(boardPost.getBrd());
						postObj.setTime(boardPost.getT());
						postObj.setNickname(boardPost.getN());
						postObj.setTxHash(txHash);
						postObj.setReplyTxHash(boardPost.getR());

						var postValidated = PostValidator.validatePost(postObj);

						if (postValidated) {
							logger.debug("Post was validated.");

							var postExist = postService.existsByTxHash(txHash);

							if (!postExist) {
								postService.save(postObj);
							} else {
								logger.debug("Post already exists in db.");
							}
						} else {
							logger.debug("Post was not validated, skipping.");
						}
					}
				}
			});
		} catch(IOException e) {
			logger.error("Sync error: " + e);
		}

		return Observable.empty();
	}

	/**
	 * Sends a GET request.
	 *
	 * @param param The endpoint to use in the GET request
	 * @return Returns if it exists or not
	 */
	public Observable<Content> getRequest(String param) throws IOException {
		var request = Request.get(String.format("http://%s/%s", hostname, param))
				.execute().returnContent();

		return Observable.just(request);
	}
}
