package com.example.healthtrack.model;
import java.sql.Timestamp;

public class SportTrack {
    Long userId;
    Long sportId;
    Timestamp startTime;
    Timestamp endTime;

    public Long getUserId() {
        return userId;
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

    public void setUserId(Long userId) {
        this.userId = userId;
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
