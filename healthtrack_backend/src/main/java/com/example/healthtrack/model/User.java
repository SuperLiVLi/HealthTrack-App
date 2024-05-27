package com.example.healthtrack.model;


public class User {
    private Long userId;
    private String name;
    private String email;
    private String password;
    private Double weight;
    private Long sId;

    public User(Long userId, String name, String email, String password, Double weight, Long sId) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.weight = weight;
        this.sId = sId;
    }

    // Getters
    public Long getUserId() {
        return userId;
    }

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

    public Long getsId() {
        return sId;
    }

    // Setters
    public void setUserId(Long userId) {
        this.userId = userId;
    }

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

    public void setsId(Long sId) {
        this.sId = sId;
    }
}