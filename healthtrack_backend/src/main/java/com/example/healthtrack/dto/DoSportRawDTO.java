package com.example.healthtrack.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class DoSportRawDTO {
    private Long sportId;
    private @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startTime;
    private @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endTime;

    public Long getSportId() {
        return sportId;
    }

    public @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date getStartTime() {
        return startTime;
    }

    public @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date getEndTime() {
        return endTime;
    }
}
