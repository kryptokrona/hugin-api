package org.kryptokrona.hugin.syncer;

import com.fasterxml.jackson.databind.ObjectMapper;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.apache.hc.client5.http.fluent.Content;
import org.apache.hc.client5.http.fluent.Request;
import org.kryptokrona.hugin.crypto.*;
import org.kryptokrona.hugin.http.PoolChangesLite;
import org.kryptokrona.hugin.repository.PostEncryptedGroupRepository;
import org.kryptokrona.hugin.repository.PostEncryptedRepository;
import org.kryptokrona.hugin.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Reader;
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

	private PostRepository postRepository;

	private PostEncryptedRepository postEncryptedRepository;

	private PostEncryptedGroupRepository postEncryptedGroupRepository;

	@Value("${SYS_NODE_HOSTNAME}")
	private String nodeHostname;

	private HostName hostname;

	private List<String> knownPoolTxsList = new ArrayList<>();

	private static final Logger logger = LoggerFactory.getLogger(HuginSyncer.class);

	@Autowired
	public HuginSyncer(
			PostRepository postRepository, PostEncryptedRepository postEncryptedRepository,
			PostEncryptedGroupRepository postEncryptedGroupRepository
	) {
		this.postRepository = postRepository;
		this.postEncryptedRepository = postEncryptedRepository;
		this.postEncryptedGroupRepository = postEncryptedGroupRepository;
	}

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.info("Background syncing...");
		// this.brokerMessagingTemplate.convertAndSend("/user", "foo");

		hostname = new HostName(nodeHostname);

		getPoolChangesLite().subscribe(System.out::println);

		// populate database with incoming data
	}

	/**
	 * Sends a POST request to /get_pool_changes lite
	 *
	 * @return Returns a JsonObject
	 */
	public Observable<Void> getPoolChangesLite() {
		try {
			getRequest("get_pool_changes_lite").subscribe(response -> {
				// System.out.println(response.asString());
				ObjectMapper objectMapper = new ObjectMapper();
				Reader reader = new StringReader(response.asString());

				PoolChangesLite poolChangesLite = objectMapper.readValue(reader, PoolChangesLite.class);
				// System.out.println(poolChangesLite.getStatus());

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

					Box boxObj = null;

					// skipping this if extra data is less than 200 - we skip this statement
					if (thisExtra != null && thisExtra.length() > 200) {
						boxObj = HuginCrypto.extraDataToMessage(thisExtra, knownKeys, keyPair);
					}

					if (boxObj == null) {
						logger.debug("Caught null message, skipping.");
						continue;
					}

					if (boxObj != null) {

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
