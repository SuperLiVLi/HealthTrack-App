package com.example.healthtrack.mapper;

import com.example.healthtrack.dto.DoSportDTO;
import com.example.healthtrack.model.Sport;
import com.example.healthtrack.dto.FoodNutrientDTO;
import com.example.healthtrack.dto.FoodIntakeDTO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SportMapper {

    List<Sport> findSports(@Param("keyword") String keyword,
                           @Param("minAmount") Float minAmount,
                           @Param("maxAmount") Float maxAmount);

    // List<FoodNutrientDTO> getSportCalories(@Param("fdcId") Long fdcId);

    void insertTempSportTrack(@Param("userId") Long userId,
                              @Param("doSports") List<DoSportDTO> doSports);
    void addDoSports(@Param("userId") Long userId);

}