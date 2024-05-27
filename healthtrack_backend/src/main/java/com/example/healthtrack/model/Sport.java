package com.example.healthtrack.model;

public class Sport {
    private Long sportId;
    private String sportName;
    private Float caloriesPerKg;

    public Long getSportId() {
        return sportId;
    }

    public String getSportName() {
        return sportName;
    }

    public Float getCaloriesPerKg() {
        return caloriesPerKg;
    }

    public void setSportId(Long sportId) {
        this.sportId = sportId;
    }

    public void setSportName(String sportName) {
        this.sportName = sportName;
    }

    public void setCaloriesPerKg(Float caloriesPerKg) {
        this.caloriesPerKg = caloriesPerKg;
    }
}
