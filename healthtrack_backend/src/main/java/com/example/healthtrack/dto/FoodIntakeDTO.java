package com.example.healthtrack.dto;

import java.sql.Timestamp;

public class FoodIntakeDTO {

    private Long fdcId;

    private Timestamp storeTime;
    private Integer intakeAmount;

    public FoodIntakeDTO(Long fdcId, Timestamp storeTime, Integer intakeAmount) {
        this.fdcId = fdcId;
        this.storeTime = storeTime;
        this.intakeAmount = intakeAmount;
    }

    public Long getFdcId() { return fdcId; }
    public Timestamp getStoreTime() { return storeTime; }
    public Integer getIntakeAmount() { return intakeAmount; }

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