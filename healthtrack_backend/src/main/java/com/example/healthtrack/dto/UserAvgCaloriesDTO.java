package com.example.healthtrack.dto;

public class UserAvgCaloriesDTO {
    private Float avgIntake;

    private Float avgBurn;

    public UserAvgCaloriesDTO (Float avgIntake, Float avgBurn) {
        this.avgIntake = avgIntake;
        this.avgBurn = avgBurn;
    }
    public Float getAvgIntake() {
        return avgIntake;
    }
    public Float getAvgBurn() {
        return avgBurn;
    }
    public void setAvgIntake(Float avgIntake) {
        this.avgIntake = avgIntake;
    }
    public void setAvgBurn(Float avgBurn) {
        this.avgBurn = avgBurn;
    }
}