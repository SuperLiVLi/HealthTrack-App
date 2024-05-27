package com.example.healthtrack.service;

import com.example.healthtrack.dto.CategoryAmountDTO;
import com.example.healthtrack.mapper.NutriTrackMapper;
import com.example.healthtrack.mapper.FoodMapper;
import com.example.healthtrack.mapper.SportMapper;
import com.example.healthtrack.dto.UserAvgNutrientDTO;
import com.example.healthtrack.dto.UserNutriTrackDTO;

import com.example.healthtrack.model.NutriTrack;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.sql.Timestamp;

@Service
public class NutriTrackService {
    private final NutriTrackMapper nutriTrackMapper;

    @Autowired
    public NutriTrackService(NutriTrackMapper nutriTrackMapper) {
        this.nutriTrackMapper = nutriTrackMapper;
    }

    public List<UserAvgNutrientDTO> getUserAvgNutrient(Timestamp startTime,
                                                       Timestamp endTime,
                                                       Long userId,
                                                       List<Long> nutrientIds) {

        List<UserAvgNutrientDTO> result = new ArrayList<>();
        for (Long nutrientId : nutrientIds) {
            result.add(nutriTrackMapper.getUserAvgNutrient(userId, nutrientId, startTime, endTime));
        }
        return result;
    }

    public List<CategoryAmountDTO> getCategoryAmount(Timestamp startTime,
                                                     Timestamp endTime,
                                                     Long userId) {
        return nutriTrackMapper.getCategoryAmount(userId, startTime, endTime);
    }

    public List<UserNutriTrackDTO> getUserNutriTrack(Long userId) {

        return nutriTrackMapper.getUserNutriTrack(userId);
    }

    public void deleteUserNutriTrack(Long userId, Long fdcId, Timestamp storeTime) {
        nutriTrackMapper.deleteUserNutriTrack(userId, fdcId, storeTime);
    }

}
