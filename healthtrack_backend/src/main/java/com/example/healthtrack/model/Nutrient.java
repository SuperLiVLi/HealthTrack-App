package com.example.healthtrack.model;


public class Nutrient {
    private Long nutrientId;
    private String nutrientName;
    private String unitName;

    public Long getId() {
        return nutrientId;
    }

    public void setId(Long nutrientId) {
        this.nutrientId = nutrientId;
    }

    public String getNutrientName() {
        return nutrientName;
    }

    public void setNutrientName(String nutrientName) {
        this.nutrientName = nutrientName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

}
