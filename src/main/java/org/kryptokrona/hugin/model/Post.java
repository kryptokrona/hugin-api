package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Post entity.
 *
 * @author Marcus Cvjeticanin
 */
@Entity
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "message")
  private String message;

  @Column(name = "key")
  private String key;

  @Column(name = "signature")
  private String signature;

  @Column(name = "board")
  private String board;

  @JsonProperty("time")
  @Column(name = "time")
  private long time;

  @Column(name = "nickname")
  private String nickname;

  @JsonProperty("tx_hash")
  @Column(name = "tx_hash")
  private String txHash;

  @Column(name = "reply")
  private String replyTxHash;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private Date createdAt;
}
