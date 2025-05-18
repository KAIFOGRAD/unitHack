package com.nauHack.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nauHack.backend.entities.Message;
import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final MessageRepository messageRepository;
    
    @Transactional(readOnly = true)
    public List<Message> getUserMessages(User user) {
        return messageRepository.findByUserOrderByCreatedAtAsc(user);
    }
    
    @Transactional
    public Message saveUserMessage(User user, String content) {
        Message message = new Message();
        message.setContent(content);
        message.setUser(user);
        message.setFromOrganizer(false);
        return messageRepository.save(message);
    }
    
    @Transactional
    public Message saveOrganizerMessage(User user, String content) {
        Message message = new Message();
        message.setContent(content);
        message.setUser(user);
        message.setFromOrganizer(true);
        return messageRepository.save(message);
    }
    
    @Transactional(readOnly = true)
    public List<Message> getUserMessagesForOrganizer(Long userId) {
        return messageRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }
}
