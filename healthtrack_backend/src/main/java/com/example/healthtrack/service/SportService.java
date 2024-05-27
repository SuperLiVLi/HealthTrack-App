package com.example.healthtrack.service;

import com.example.healthtrack.dto.DoSportDTO;
import com.example.healthtrack.mapper.SportMapper;

import com.example.healthtrack.model.Sport;
import com.example.healthtrack.dto.FoodNutrientDTO;

import com.example.healthtrack.dto.FoodIntakeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {
    private final SportMapper sportMapper;

    @Autowired
    public SportService(SportMapper sportMapper) {
        this.sportMapper = sportMapper;
    }

    public List<Sport> searchSports(String keyword, Float minAmount, Float maxAmount) {
        return sportMapper.findSports(keyword, minAmount, maxAmount);
    }


    public void addDoSports(Long userId, List<DoSportDTO> doSports) {
        sportMapper.insertTempSportTrack(userId, doSports);
        sportMapper.addDoSports(userId);
    }
}