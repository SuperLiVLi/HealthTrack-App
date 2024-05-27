package com.example.healthtrack.controller;

import com.example.healthtrack.dto.CategoryAmountDTO;
import com.example.healthtrack.dto.UserAvgCaloriesDTO;
import com.example.healthtrack.dto.UserDailyCaloriesDTO;

import com.example.healthtrack.service.SportTrackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.sql.Timestamp;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/sport-track")
public class SportTrackController {

    @Autowired
    private final SportTrackService sportTrackService;

    public SportTrackController(SportTrackService sportTrackService) { this.sportTrackService = sportTrackService;}

    @GetMapping("/summary")
    public UserAvgCaloriesDTO getUserAvgCalories(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startTime,
                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endTime) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());

        Timestamp startTimestamp = new Timestamp(startTime.getTime());
        Timestamp endTimestamp = new Timestamp(endTime.getTime());

        return sportTrackService.getUserAvgCalories(startTimestamp, endTimestamp, userId);
    }

    @GetMapping("/daily-track")
    public List<UserDailyCaloriesDTO> getUserDailyCalories(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startTime,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endTime) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());

        Timestamp startTimestamp = new Timestamp(startTime.getTime());
        Timestamp endTimestamp = new Timestamp(endTime.getTime());

        return sportTrackService.getUserDailyCalories(startTimestamp, endTimestamp, userId);
    }

}