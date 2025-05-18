package com.nauHack.backend.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nauHack.backend.entities.Event;
import com.nauHack.backend.service.FavoriteEventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api//v1/users/{userId}/favorites")
@RequiredArgsConstructor
public class FavoriteEventController {

    private final FavoriteEventService favoriteEventService;

    @PostMapping("/{eventId}")
    public ResponseEntity<Void> addEventToFavorites(
            @PathVariable Long userId,
            @PathVariable Long eventId) {
        favoriteEventService.addEvnetsToFavorite(userId, eventId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> removeEventFromFavorites(
            @PathVariable Long userId,
            @PathVariable Long eventId) {
        favoriteEventService.removeEventFromFavorites(userId, eventId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Set<Event>> getUserFavoriteEvents(
            @PathVariable Long userId) {
        Set<Event> favoriteEvents = favoriteEventService.getUserFavoriteEvents(userId);
        return ResponseEntity.ok(favoriteEvents);
    }
}
