package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}