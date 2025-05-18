package com.nauHack.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nauHack.backend.entities.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
