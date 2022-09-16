package org.kryptokrona.hugin.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
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

    @ManyToMany
    @JoinTable(
            name = "post_hashtag",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "hashtag_id")}
    )
    @JsonProperty("hashtags")
    public List<Hashtag> hashtags;

    @JsonGetter("hashtags")
    public List<String> getAllHashtags() {
      if(hashtags != null) {
        return hashtags.stream()
                .map(h -> {
                  return "/api/v1/hashtags/" + h.getId();
                }).collect(Collectors.toList());
      }
      return null;
    }

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }

    public String getKey() {
      return key;
    }

    public void setKey(String key) {
      this.key = key;
    }

    public String getSignature() {
      return signature;
    }

    public void setSignature(String signature) {
      this.signature = signature;
    }

    public String getBoard() {
      return board;
    }

    public void setBoard(String board) {
      this.board = board;
    }

    public long getTime() {
      return time;
    }

    public void setTime(long time) {
      this.time = time;
    }

    public String getNickname() {
      return nickname;
    }

    public void setNickname(String nickname) {
      this.nickname = nickname;
    }

    public String getTxHash() {
      return txHash;
    }

    public void setTxHash(String txHash) {
      this.txHash = txHash;
    }

    public String getReplyTxHash() {
      return replyTxHash;
    }

    public void setReplyTxHash(String replyTxHash) {
      this.replyTxHash = replyTxHash;
    }

    public Date getCreatedAt() {
      return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
      this.createdAt = createdAt;
    }

    public List<Hashtag> getHashtags() {
      return hashtags;
    }

    public void setHashtags(List<Hashtag> hashtags) {
      this.hashtags = hashtags;
    }

}
