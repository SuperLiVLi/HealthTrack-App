package com.example.healthtrack.dto;

import java.sql.Time;
import java.sql.Timestamp;

public class DoSportDTO {
    private Long sportId;
    private Timestamp startTime;
    private Timestamp endTime;

    public DoSportDTO(Long sportId, Timestamp startTime, Timestamp endTime) {
        this.sportId = sportId;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getSportId() {
        return sportId;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setSportId(Long sportId) {
        this.sportId = sportId;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }
}