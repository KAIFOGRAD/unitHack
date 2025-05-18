package com.nauHack.backend.dto;

import java.util.Date;

import lombok.Data;

@Data
public class CreateEventDto {
    private String name;
    private String description;
    private Date startTime;
    private Date endTime;
    private int numberSeats;
    private int maxSeats;
    private String location;
    private Long organizerId;

}
