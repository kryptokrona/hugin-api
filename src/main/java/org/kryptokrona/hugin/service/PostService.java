package org.kryptokrona.hugin.service;

import org.kryptokrona.hugin.model.Post;
import org.kryptokrona.hugin.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Post Service.
 *
 * @author Marcus Cvjeticanin
 */
@Service
public class PostService {

  @Autowired
  private PostRepository postRepository;

  public Page<Post> getAll(int page, int size) {
    Page<Post> pageTuts = null;
    Pageable paging = PageRequest.of(page, size);

    return postRepository.findAll(paging);
  }
}
