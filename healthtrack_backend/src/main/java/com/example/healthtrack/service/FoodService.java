package com.example.healthtrack.service;

import com.example.healthtrack.mapper.FoodMapper;

import com.example.healthtrack.model.Food;
import com.example.healthtrack.dto.FoodNutrientDTO;

import com.example.healthtrack.dto.FoodIntakeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodMapper foodMapper;

    @Autowired
    public FoodService(FoodMapper foodMapper) {
        this.foodMapper = foodMapper;
    }

    public List<Food> searchFoods(String keyword, String categoryName, String metric, Float minAmount, Float maxAmount) {
        if (metric.isEmpty() || metric.equals("No Nutrient Filtering")) {
            if (categoryName.isEmpty() || categoryName.equals("Select All Categories")) {
                return foodMapper.findByKeyword(keyword);
            } else {
                return foodMapper.findByKeywordAndCategory(keyword, categoryName);
            }
        } else {
            if (categoryName.isEmpty() || categoryName.equals("Select All Categories")) {
                return foodMapper.findByKeywordFilter(keyword, metric, minAmount, maxAmount);
            } else {
                return foodMapper.findByKeywordAndCategoryFilter(keyword, categoryName, metric, minAmount, maxAmount);
            }
        }
    }

    public List<FoodNutrientDTO> getFoodNutrients(Long fdcId) {
        return foodMapper.getFoodNutrients(fdcId);
    }

    public void addFoodIntakes(Long userId, List<FoodIntakeDTO> foodIntakes) {

        foodMapper.insertTempNutriTrack(userId, foodIntakes);
        foodMapper.addFoodIntakes(userId);
    }
}