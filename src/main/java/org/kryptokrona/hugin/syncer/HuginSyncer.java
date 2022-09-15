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
import org.kryptokrona.hugin.http.KnownPoolTxs;
import org.kryptokrona.hugin.http.Post;
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

	public Observable<JsonObject> getRequest(String param) throws IOException {
		var request = requestFactory.buildGetRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)));

		JsonObject response = gson.fromJson(request.execute().parseAsString(), postCollectionType);

		return Observable.just(response);
	}

	public Observable<JsonObject> postRequest(String param, Object obj) throws IOException {
		var request = requestFactory.buildPostRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)),
				// when using typetoken, do not remove as suggested per IDE to remove the Object inside the <> below!
				ByteArrayContent.fromString("application/json", gson.toJson(obj, new TypeToken<Object>() {
				}.getType())));

		var test = request.getHeaders().setContentType("application/json").toString();

		JsonObject response = gson.fromJson(
				request.getHeaders().setContentType("application/json").toString(),
				postCollectionType // should be another one here
		);

		return Observable.just(response);
	}

}
