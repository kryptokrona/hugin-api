package org.kryptokrona.hugin.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.SpringDocUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI Configuration for Swagger UI
 *
 * @author Marcus Cvjeticanin
 */
@Configuration
public class OpenApiConfig {

	static {
		SpringDocUtils.getConfig().removeRequestWrapperToIgnore(java.util.Map.class);
	}

	@Bean
	public OpenAPI customOpenAPI(
			@Value("${apiTitle}") String apiTitle,
			@Value("${apiDescription}") String apiDescription,
			@Value("${apiVersion}") String apiVersion,
			@Value("${apiContactName}") String apiContactName,
			@Value("${apiContactEmail}") String apiContactEmail,
			@Value("${apiContactUrl}") String apiContactUrl,
			@Value("${apiServerUrl}") String apiServerUrl
	) {
		Server server = new Server();
		server.setUrl(apiServerUrl);

		return new OpenAPI()
				.components(new Components())
				.servers(List.of(server))
				.info(new Info()
						.title(apiTitle)
						.description(apiDescription)
						.version(apiVersion)
						.contact(new Contact().name(apiContactName).email(apiContactEmail).url(apiContactUrl))
				);
	}
}