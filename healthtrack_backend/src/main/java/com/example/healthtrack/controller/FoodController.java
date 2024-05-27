package com.example.healthtrack.controller;

import com.example.healthtrack.model.Food;
import com.example.healthtrack.dto.FoodNutrientDTO;
import com.example.healthtrack.dto.FoodIntakeDTO;
import com.example.healthtrack.dto.FoodIntakeRawDTO;

import com.example.healthtrack.service.FoodService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataAccessException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/search")
    public List<Food> searchFoods(
            @RequestParam String keyword,
            @RequestParam String categoryName,
            @RequestParam String metric,
            @RequestParam Float minAmount,
            @RequestParam Float maxAmount) {
        return foodService.searchFoods(keyword, categoryName, metric, minAmount, maxAmount);
    }

    @GetMapping("/{fdcId}")
    public List<FoodNutrientDTO> getFoodNutrients(@PathVariable Long fdcId) {
        return foodService.getFoodNutrients(fdcId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFoodIntakes(@RequestBody List<FoodIntakeRawDTO> foodIntakeRaws) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = Long.parseLong(authentication.getPrincipal().toString());

            List<FoodIntakeDTO> foodIntakes = new ArrayList<>();
            for (FoodIntakeRawDTO foodIntakeRaw : foodIntakeRaws) {
                Timestamp storeTimestamp = new Timestamp(foodIntakeRaw.getStoreTime().getTime());
                FoodIntakeDTO foodIntakeDTO = new FoodIntakeDTO(foodIntakeRaw.getFdcId(), storeTimestamp, foodIntakeRaw.getIntakeAmount());
                foodIntakes.add(foodIntakeDTO);
            }

            foodService.addFoodIntakes(userId, foodIntakes);
            return ResponseEntity.ok("Food intakes added successfully.");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: Time overlap detected with existing entry.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing request: " + e.getMessage());
        }
    }
}