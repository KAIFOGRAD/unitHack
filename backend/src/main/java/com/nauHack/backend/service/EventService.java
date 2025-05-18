package com.nauHack.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nauHack.backend.dto.CreateEventDto;
import com.nauHack.backend.entities.Event;
import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.repository.EventRepository;
import com.nauHack.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Event createEvent(CreateEventDto eventDto) {
        User organizer = userRepository.findById(eventDto.getOrganizerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = new Event();
        event.setName(eventDto.getName());
        event.setDescription(eventDto.getDescription());
        event.setStartTime(eventDto.getStartTime());
        event.setEndTime(eventDto.getEndTime());
        event.setNumberSeats(eventDto.getNumberSeats());
        event.setMaxSeats(eventDto.getMaxSeats());
        event.setLocation(eventDto.getLocation());
        event.setOrganizer(organizer);

        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

}
