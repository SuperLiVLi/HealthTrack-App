package com.example.healthtrack.service;

import com.example.healthtrack.dto.UserSignupDTO;
import com.example.healthtrack.dto.LoginResponseDTO;

import com.example.healthtrack.mapper.UserMapper;
import com.example.healthtrack.model.User;
import com.example.healthtrack.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public Map<String, String> register(UserSignupDTO userSignupDTO) {
        Map<String, String> response = new HashMap<>();

        if (userSignupDTO.getName() == null || userSignupDTO.getName().isEmpty()) {
            response.put("name", "Name is required");
        }
        if (userSignupDTO.getEmail() == null || userSignupDTO.getEmail().isEmpty()) {
            response.put("email", "Email is required");
        } else if (userMapper.checkEmailContains(userSignupDTO.getEmail())) {
            response.put("email", "This email has been used");
        }
        if (userSignupDTO.getPassword() == null || userSignupDTO.getPassword().isEmpty()) {
            response.put("password", "Password is required");
        }
        if (userSignupDTO.getWeight() == null) {
            response.put("weight", "Weight is required");
        }

        if (!response.isEmpty()) {
            return response;
        }

        Long maxUserId = userMapper.getMaxUserId();
        User user = new User(maxUserId + 1, userSignupDTO.getName(), userSignupDTO.getEmail(), userSignupDTO.getPassword(),
                userSignupDTO.getWeight(), 1L);

        userMapper.insertUser(user);
        String token = JwtUtil.generateToken(user.getUserId().toString());
        response.put("token", token);
        return response;
    }

    public LoginResponseDTO login(String email, String password) {
        User user = userMapper.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            String token = JwtUtil.generateToken(user.getUserId().toString()); // Generate JWT token if login is successful
            return new LoginResponseDTO(token, user.getName()); // Return both token and user's name
        }
        return null; // Login failed
    }
}