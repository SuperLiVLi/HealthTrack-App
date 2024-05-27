package com.example.healthtrack.dto;

import java.sql.Timestamp;

public class UserNutriTrackDTO {
    private Long userId;
    private Long fdcId;

    private String foodName;

    private String categoryName;

    private Timestamp storeTime;
    private Integer intakeAmount;

    //
    public Long getUserId() { return userId; }
    public Long getFdcId() { return fdcId; }
    public String getFoodName() { return foodName; }
    public String getCategoryName() { return categoryName; }
    public Timestamp getStoreTime() { return storeTime; }
    public Integer getIntakeAmount() { return intakeAmount; }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setStoreTime(Timestamp storeTime) {
        this.storeTime = storeTime;
    }

    public void setIntakeAmount(Integer intakeAmount) {
        this.intakeAmount = intakeAmount;
    }
}
