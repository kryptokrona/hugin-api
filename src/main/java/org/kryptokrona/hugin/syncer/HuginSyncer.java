package org.kryptokrona.hugin.syncer;

import com.fasterxml.jackson.databind.ObjectMapper;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.apache.hc.client5.http.fluent.Content;
import org.apache.hc.client5.http.fluent.Request;
import org.kryptokrona.hugin.crypto.KeyPair;
import org.kryptokrona.hugin.http.KnownPoolTxs;
import org.kryptokrona.hugin.http.PoolChangesLite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

	@Value("${SYS_NODE_HOSTNAME}")
	private String nodeHostname;

	private HostName hostname;

	private List<String> knownPoolTxsList = new ArrayList<>();

	private static final Logger logger = LoggerFactory.getLogger(HuginSyncer.class);

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.info("Background syncing...");

		hostname = new HostName(nodeHostname);

		getPoolChangesLite().subscribe(response -> {
			System.out.println(response);
		});

		// populate database with incoming data
	}

	/**
	 * Sends a POST request to /get_pool_changes lite
	 *
	 * @return Returns a JsonObject
	 */
	public Observable<PoolChangesLite> getPoolChangesLite() {
		var knownPoolTxs = new KnownPoolTxs();
		knownPoolTxs.setKnownTxsIds(knownPoolTxsList);

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

					var knownk = new ArrayList<>();

					var keyPair = new KeyPair();
					keyPair.setPrivateSpendKey("0000000000000000000000000000000000000000000000000000000000000000");
					keyPair.setPrivateViewKey("0000000000000000000000000000000000000000000000000000000000000000");

					String message = null;

					if (thisExtra != null && thisExtra.length() > 200) {
						logger.debug("Extra data is less than 200 in length, skipping.");
						// var boxObj =
					}

					if (message == null) {
						logger.debug("Caught null message, skipping.");
					}

					if (message != null) {

					}



				}
			});
		} catch(IOException e) {
			logger.error("Sync error: " + e);
		}


		/*JsonObject response = gson.fromJson(
				responseStr,
				poolChangesLiteCollectionType
		);*/

		return Observable.empty();
	}

	public Observable<Content> getRequest(String param) throws IOException {
		var request = Request.get(String.format("http://%s/%s", hostname, param))
				.execute().returnContent();

		return Observable.just(request);
	}
}
