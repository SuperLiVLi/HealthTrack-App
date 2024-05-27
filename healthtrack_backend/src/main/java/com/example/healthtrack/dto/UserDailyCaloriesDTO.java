package com.example.healthtrack.dto;
import java.sql.Date;
import java.sql.Date;

public class UserDailyCaloriesDTO {
    private Date caloriesDate;
    private Float totalIntake;
    private Float totalBurn;
    public Date getCaloriesDate() {
        return caloriesDate;
    }
    public Float getTotalIntake() {
        return totalIntake;
    }
    public Float getTotalBurn() {
        return totalBurn;
    }
    public void setCaloriesDate(Date caloriesDate) {
        this.caloriesDate = caloriesDate;
    }
    public void setTotalIntake(Float totalIntake) {
        this.totalIntake = totalIntake;
    }

    public void setTotalBurn(Float totalBurn) {
        this.totalBurn = totalBurn;
    }
}
