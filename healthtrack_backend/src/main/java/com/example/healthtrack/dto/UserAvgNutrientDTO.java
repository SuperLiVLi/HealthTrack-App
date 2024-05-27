package com.example.healthtrack.dto;

public class UserAvgNutrientDTO {
    private Long nutrientId;
    private Float avgIntake;
    private String unitName;

    public UserAvgNutrientDTO (Long nutrientId, Float avgIntake, String unitName) {
        this.nutrientId = nutrientId;
        this.avgIntake = avgIntake;
        this.unitName = unitName;
    }

    public Long getNutrientId() { return nutrientId; }
    public Float getAvgIntake() {
        return avgIntake;
    }
    public String getUnitName() {
        return unitName;
    }
    public void setNutrientId(Long nutrientId) { this.nutrientId = nutrientId; }
    public void setAvgIntake(Float amount) {
        this.avgIntake = amount;
    }
    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
}
