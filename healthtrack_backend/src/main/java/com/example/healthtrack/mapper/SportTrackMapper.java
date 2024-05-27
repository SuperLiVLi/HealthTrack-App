package com.example.healthtrack.mapper;

import com.example.healthtrack.dto.UserAvgCaloriesDTO;

import com.example.healthtrack.dto.UserDailyCaloriesDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.sql.Timestamp;


@Mapper
public interface SportTrackMapper {
    UserAvgCaloriesDTO getUserAvgCalories(@Param("userId") Long userId,
                                          @Param("startTime") Timestamp startTime,
                                          @Param("endTime") Timestamp endTime);
    List<UserDailyCaloriesDTO> getUserDailyCalories(@Param("userId") Long userId,
                                                    @Param("startTime") Timestamp startTime,
                                                    @Param("endTime") Timestamp endTime);
}