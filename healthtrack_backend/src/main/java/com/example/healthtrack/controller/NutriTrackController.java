package com.example.healthtrack.controller;

import com.example.healthtrack.dto.CategoryAmountDTO;
import com.example.healthtrack.dto.UserAvgNutrientDTO;

import com.example.healthtrack.dto.UserNutriTrackDTO;
import com.example.healthtrack.model.NutriTrack;
import com.example.healthtrack.service.NutriTrackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.sql.Timestamp;

import java.util.List;

@RestController
@RequestMapping("/api/nutrient-track")
public class NutriTrackController {

    @Autowired
    private final NutriTrackService nutriTrackService;

    public NutriTrackController(NutriTrackService nutriTrackService) { this.nutriTrackService = nutriTrackService;}

    @GetMapping("/summary")
    public List<UserAvgNutrientDTO> getUserAvgNutrient(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startTime,
                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endTime,
                                                 @RequestParam List<Long> nutrientIds) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());
        Timestamp startTimestamp = new Timestamp(startTime.getTime());
        Timestamp endTimestamp = new Timestamp(endTime.getTime());

        return nutriTrackService.getUserAvgNutrient(startTimestamp, endTimestamp, userId, nutrientIds);
    }

    @GetMapping("/category-amount")
    public List<CategoryAmountDTO> getCategoryAmount(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startTime,
                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endTime) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());

        Timestamp startTimestamp = new Timestamp(startTime.getTime());
        Timestamp endTimestamp = new Timestamp(endTime.getTime());

        return nutriTrackService.getCategoryAmount(startTimestamp, endTimestamp, userId);
    }

    @GetMapping("/list")
    public List<UserNutriTrackDTO> getUserNutriTrack() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());

        return nutriTrackService.getUserNutriTrack(userId);
    }

    @GetMapping("/delete")
    void deleteUserNutriTrack(@RequestParam Long fdcId,
                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date storeTime) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(authentication.getPrincipal().toString());
        Timestamp storeTimestamp = new Timestamp(storeTime.getTime());
        nutriTrackService.deleteUserNutriTrack(userId, fdcId, storeTimestamp);
    }

}
