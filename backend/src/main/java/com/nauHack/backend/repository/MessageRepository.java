package com.nauHack.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nauHack.backend.entities.Message;
import com.nauHack.backend.entities.User.User;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUserIdOrderByCreatedAtAsc(Long userId);
    List<Message> findByUserOrderByCreatedAtAsc(User user);
}
