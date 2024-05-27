package com.example.healthtrack.mapper;

import com.example.healthtrack.model.Food;
import com.example.healthtrack.dto.FoodNutrientDTO;
import com.example.healthtrack.dto.FoodIntakeDTO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FoodMapper {
    List<Food> findByKeyword(@Param("keyword") String keyword);
    List<Food> findByKeywordAndCategory(@Param("keyword") String keyword,
                                        @Param("categoryName") String categoryName);
    List<Food> findByKeywordFilter(@Param("keyword") String keyword,
                                   @Param("metric") String metric,
                                   @Param("minAmount") Float minAmount,
                                   @Param("maxAmount") Float maxAmount);
    List<Food> findByKeywordAndCategoryFilter(@Param("keyword") String keyword,
                                              @Param("categoryName") String categoryName,
                                              @Param("metric") String metric,
                                              @Param("minAmount") Float minAmount,
                                              @Param("maxAmount") Float maxAmount);

    List<FoodNutrientDTO> getFoodNutrients(@Param("fdcId") Long fdcId);

    void insertTempNutriTrack(@Param("userId") Long userId,
                              @Param("foodIntakes") List<FoodIntakeDTO> foodIntakes);
    void addFoodIntakes(@Param("userId") Long userId);
}