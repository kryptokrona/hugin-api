package org.kryptokrona.hugin.http;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Post HTTP model that represent data we get from the node.
 *
 * @author Marcus Cvjeticanin
 */
@Getter
@Setter
@NoArgsConstructor
public class Post {

	private String message;

	private String key;

	private String signature;

	private String board;

	private long time;

	private String nickname;

	private String txHash;

	private String replyTxHash;
}
