package com.example.healthtrack.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

public class FoodIntakeRawDTO {

    private Long fdcId;

    private @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date storeTime;
    private Integer intakeAmount;

    public Long getFdcId() { return fdcId; }
    public @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date getStoreTime() { return storeTime; }
    public Integer getIntakeAmount() { return intakeAmount; }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public void setStoreTime(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date storeTime) {
        this.storeTime = storeTime;
    }

    public void setIntakeAmount(Integer intakeAmount) {
        this.intakeAmount = intakeAmount;
    }
}