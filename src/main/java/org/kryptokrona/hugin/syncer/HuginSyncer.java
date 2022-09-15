package org.kryptokrona.hugin.syncer;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import inet.ipaddr.HostName;
import io.reactivex.rxjava3.core.Observable;
import org.kryptokrona.hugin.http.Post;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;

/**
 * Hugin Syncer.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class HuginSyncer {

	private final Gson gson = new Gson();

	private final HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();

	private Type postCollectionType = new TypeToken<Post>(){}.getType();

	private HostName hostname = new HostName("");

	@Scheduled(fixedRate=1000)
	public void sync() {
		//Check states and send mails
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
