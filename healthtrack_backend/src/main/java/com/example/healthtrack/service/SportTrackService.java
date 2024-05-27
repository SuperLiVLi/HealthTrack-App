package com.example.healthtrack.service;

import com.example.healthtrack.dto.UserDailyCaloriesDTO;
import com.example.healthtrack.mapper.SportTrackMapper;
import com.example.healthtrack.dto.UserAvgCaloriesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.sql.Timestamp;

@Service
public class SportTrackService {
    private final SportTrackMapper sportTrackMapper;

    @Autowired
    public SportTrackService(SportTrackMapper sportTrackMapper) {
        this.sportTrackMapper = sportTrackMapper;
    }

    public UserAvgCaloriesDTO getUserAvgCalories(Timestamp startTime,
                                                 Timestamp endTime,
                                                 Long userId) {
        return sportTrackMapper.getUserAvgCalories(userId, startTime, endTime);
    }

    public List<UserDailyCaloriesDTO> getUserDailyCalories(Timestamp startTime,
                                                           Timestamp endTime,
                                                           Long userId) {
        return sportTrackMapper.getUserDailyCalories(userId, startTime, endTime);
    }
}