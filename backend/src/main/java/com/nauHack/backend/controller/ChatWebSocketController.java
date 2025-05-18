package com.nauHack.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nauHack.backend.entities.Message;
import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.service.ChatService;

import lombok.RequiredArgsConstructor;



import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final ChatService chatService;

    @GetMapping
    public ResponseEntity<List<Message>> getChatHistory(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(chatService.getUserMessages(user));
    }

    @MessageMapping("/send") 
    @SendTo("/topic/messages") 
    public Message sendMessage(@Payload String messageContent, SimpMessageHeaderAccessor headerAccessor) {
        User user = (User ) headerAccessor.getSessionAttributes().get("user");
        return chatService.saveUserMessage(user, messageContent);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getUserChat(
            @PathVariable Long userId) {
        return ResponseEntity.ok(
            chatService.getUserMessagesForOrganizer(userId)
        );
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Message> sendMessageAsOrganizer(
            @PathVariable Long userId,
            @RequestBody String messageContent) {
       
        User user = new User();
        user.setId(userId);
        return ResponseEntity.ok(
            chatService.saveOrganizerMessage(user, messageContent)
        );
    }
}
