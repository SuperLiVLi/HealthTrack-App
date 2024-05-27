package com.example.healthtrack.dto;

public class CategoryAmountDTO {
    private String categoryName;
    private Float totalAmount;


    public String getCategoryName() {
        return categoryName;
    }

    public Float getTotalAmount() {
        return totalAmount;
    }


    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }
}
