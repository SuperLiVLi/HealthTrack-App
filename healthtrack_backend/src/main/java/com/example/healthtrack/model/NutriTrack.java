package com.example.healthtrack.model;
import java.sql.Timestamp;

public class NutriTrack {
    private Long userId;
    private Long fdcId;

    private Timestamp storeTime;
    private Integer intakeAmount;

    public Long getUserId() { return userId; }
    public Long getFdcId() { return fdcId; }
    public Timestamp getStoreTime() { return storeTime; }
    public Integer getIntakeAmount() { return intakeAmount; }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public void setStoreTime(Timestamp storeTime) {
        this.storeTime = storeTime;
    }

    public void setIntakeAmount(Integer intakeAmount) {
        this.intakeAmount = intakeAmount;
    }
}
