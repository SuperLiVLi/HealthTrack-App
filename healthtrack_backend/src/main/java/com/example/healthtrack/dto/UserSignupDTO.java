package com.example.healthtrack.dto;

public class UserSignupDTO {
    private String name;
    private String email;
    private String password;
    private Double weight;

    // Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Double getWeight() {
        return weight;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }
}
