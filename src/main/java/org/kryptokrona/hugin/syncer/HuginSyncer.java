package org.kryptokrona.hugin.syncer;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.kryptokrona.hugin.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Hugin Syncer.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HuginSyncer {

	private Gson gson = new Gson();

	private HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();

	private Type postCollectionType = new TypeToken<Post>(){}.getType();

	private Type poolChangesLiteCollectionType = new TypeToken<PoolChangesLite>(){}.getType();

	private Type transactionPrefixCollectionType = new TypeToken<TransactionPrefix>(){}.getType();

	private Type transactionPrefixInfoCollectionType = new TypeToken<TransactionPrefixInfo>(){}.getType();

	private Type vinCollectionType = new TypeToken<Vin>(){}.getType();

	private Type vinValueCollectionType = new TypeToken<VinValue>(){}.getType();

	private Type voutCollectionType = new TypeToken<Vout>(){}.getType();

	private Type voutTargetCollectionType = new TypeToken<VoutTarget>(){}.getType();

	private Type voutTargetDataCollectionType = new TypeToken<VoutTargetData>(){}.getType();

	@Value("${SYS_NODE_HOSTNAME}")
	private String nodeHostname;

	private HostName hostname = new HostName(nodeHostname);

	private List<String> knownPoolTxsList = new ArrayList<>();

	private static final Logger logger = LoggerFactory.getLogger(HuginSyncer.class);

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.info("Background syncing...");
		var knownPoolTxs = new KnownPoolTxs();
		knownPoolTxs.setKnownTxsIds(knownPoolTxsList);

		try {
			postRequest("get_pool_changes_lite", knownPoolTxs)
					.subscribe(System.out::println);
		} catch(IOException e) {
			logger.error("Sync error: " + e);
		}

		// populate database with incoming data
	}

	/**
	 * Sends a POST request to /get_pool_changes lite
	 *
	 * @param responseStr The response string
	 * @return Returns a JsonObject
	 */
	public Observable<PoolChangesLite> getPoolChangesLite(String responseStr) {
		JsonObject response = gson.fromJson(
				responseStr,
				postCollectionType // should be another one here
		);

		return Observable.empty();
	}

	public Observable<String> getRequest(String param) throws IOException {
		var request = requestFactory.buildGetRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)));

		// JsonObject response = gson.fromJson(, postCollectionType);

		return Observable.just(request.execute().parseAsString());
	}

	public Observable<String> postRequest(String param, Object obj) throws IOException {
		var request = requestFactory.buildPostRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)),
				// when using typetoken, do not remove as suggested per IDE to remove the Object inside the <> below!
				ByteArrayContent.fromString("application/json", gson.toJson(obj, new TypeToken<Object>() {
				}.getType())));

		return Observable.just(request.getHeaders().setContentType("application/json").toString());
	}

}
