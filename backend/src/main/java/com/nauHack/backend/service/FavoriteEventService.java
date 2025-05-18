package com.nauHack.backend.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.entities.Event;
import com.nauHack.backend.repository.EventRepository;
import com.nauHack.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FavoriteEventService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public void addEvnetsToFavorite(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        user.getFavoriteEvents().add(event);
        userRepository.save(user);

    }

    public void removeEventFromFavorites(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));

        user.getFavoriteEvents().remove(event);
        userRepository.save(user);
    }

    public Set<Event> getUserFavoriteEvents(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"))
                .getFavoriteEvents();
    }

}
