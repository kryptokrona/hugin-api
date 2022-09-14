package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

  @JsonProperty("message")
  @Column(name = "message")
  private String message;

  @JsonProperty("key")
  @Column(name = "key")
  private String key;

  @JsonProperty("signature")
  @Column(name = "signature")
  private String signature;

  @JsonProperty("board")
  @Column(name = "board")
  private String board;

  @JsonProperty("time")
  @Column(name = "time")
  private long time;

  @JsonProperty("nickname")
  @Column(name = "nickname")
  private String nickname;

  @JsonProperty("tx_hash")
  @Column(name = "tx_hash")
  private String txHash;

  @JsonProperty("reply")
  @Column(name = "reply")
  private String reply;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private Date createdAt;
}
