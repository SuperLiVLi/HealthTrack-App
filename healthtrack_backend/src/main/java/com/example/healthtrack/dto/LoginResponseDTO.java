package com.example.healthtrack.dto;

public class LoginResponseDTO {
    private String token;
    private String name;

    public LoginResponseDTO(String token, String name) {
        this.token = token;
        this.name = name;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setToken(String token) {
        this.token = token;
    }

    public void setName(String name) {
        this.name = name;
    }
}