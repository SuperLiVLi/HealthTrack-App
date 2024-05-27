package com.example.healthtrack.mapper;

import com.example.healthtrack.model.Food;
import com.example.healthtrack.dto.UserAvgNutrientDTO;
import com.example.healthtrack.dto.CategoryAmountDTO;
import com.example.healthtrack.dto.UserNutriTrackDTO;

import com.example.healthtrack.model.NutriTrack;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.sql.Timestamp;


@Mapper
public interface NutriTrackMapper {
    UserAvgNutrientDTO getUserAvgNutrient(@Param("userId") Long userId,
                                          @Param("nutrientId") Long nutrientId,
                                          @Param("startTime") Timestamp startTime,
                                          @Param("endTime") Timestamp endTime);

    List<CategoryAmountDTO> getCategoryAmount(@Param("userId") Long userId,
                                              @Param("startTime") Timestamp startTime,
                                              @Param("endTime") Timestamp endTime);

    List<UserNutriTrackDTO> getUserNutriTrack(@Param("userId") Long userId);

    void deleteUserNutriTrack(@Param("userId") Long userId,
                              @Param("fdcId") Long fdcId,
                              @Param("storeTime") Timestamp storeTime);

    void UpdateDailyNutrientIntake();
    void UpdateDailyCalories();
}
