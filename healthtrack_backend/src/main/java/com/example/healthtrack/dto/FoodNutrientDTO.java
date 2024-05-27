package com.example.healthtrack.dto;

public class FoodNutrientDTO {
    private Long fdcId;
    private String foodName;
    private String categoryName;
    private Long nutrientId;
    private String nutrientName;
    private String unitName;
    private Float amount;

    public FoodNutrientDTO(Long fdcId,
                         String foodName,
                         String categoryName,
                         Long nutrientId,
                         String nutrientName,
                         String unitName,
                         Float amount) {
        this.fdcId = fdcId;
        this.foodName = foodName;
        this.categoryName = categoryName;
        this.nutrientId = nutrientId;
        this.nutrientName = nutrientName;
        this.unitName = unitName;
        this.amount = amount;
    }

    // Getters and Setters
    public Long getFdcId() {
        return fdcId;
    }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getNutrientId() {
        return nutrientId;
    }

    public void setNutrientId(Long nutrientId) {
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

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }
}


