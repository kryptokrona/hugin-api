package org.kryptokrona.hugin.syncer;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.kryptokrona.hugin.model.http.KnownPoolTxs;
import org.kryptokrona.hugin.model.http.Post;
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

	private final Gson gson = new Gson();

	private final HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();

	private final Type postCollectionType = new TypeToken<Post>(){}.getType();

	@Value("${nodeHostname}")
	private String nodeHostname;

	private HostName hostname = new HostName(nodeHostname);

	private List<String> knownPoolTxs = new ArrayList<>();

	private static final Logger logger = LoggerFactory.getLogger(HuginSyncer.class);

	@Scheduled(fixedRate=1000)
	public void sync() {
		logger.info("Background syncing...");

		try {
			postRequest("get_pool_changes_lite", new KnownPoolTxs())
					.subscribe(System.out::println);
		} catch(IOException e) {
			logger.error("Sync error: " + e);
		}

		// populate database with incoming data
	}

	public Observable<String> getRequest(String param) throws IOException {
		var request = requestFactory.buildGetRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)));

		return Observable.just(request.execute().parseAsString());
	}

	public Observable<String> postRequest(String param, Object obj) throws IOException {
		var request = requestFactory.buildPostRequest(
				new GenericUrl(String.format("http://%s/%s", this.hostname.toString(), param)),
				ByteArrayContent.fromString("application/json", gson.toJson(obj, new TypeToken<>() {
				}.getType())));

		return Observable.just(request.getHeaders().setContentType("application/json").toString());
	}

}
