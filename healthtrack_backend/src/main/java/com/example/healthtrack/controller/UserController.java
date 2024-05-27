package com.example.healthtrack.controller;

import com.example.healthtrack.dto.UserLoginDTO;
import com.example.healthtrack.dto.UserSignupDTO;
import com.example.healthtrack.dto.LoginResponseDTO;

import com.example.healthtrack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserSignupDTO userSignupDTO) {
        Map<String, String> result = userService.register(userSignupDTO);
        if (!result.containsKey("token")) {
            return ResponseEntity.badRequest().body(result);
        }
        String token = result.get("token");
        return ResponseEntity.ok().body("{\"token\":\"" + token + "\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        LoginResponseDTO loginResponse = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        if (loginResponse != null) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}