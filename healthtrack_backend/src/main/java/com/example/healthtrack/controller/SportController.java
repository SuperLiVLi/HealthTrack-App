package com.example.healthtrack.controller;

import com.example.healthtrack.dto.*;
import com.example.healthtrack.model.Sport;

import com.example.healthtrack.service.SportService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataAccessException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/sports")
public class SportController {
    private final SportService sportService;

    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @GetMapping("/search")
    public List<Sport> searchSports(
            @RequestParam String keyword,
            @RequestParam Float minAmount,
            @RequestParam Float maxAmount) {
        return sportService.searchSports(keyword, minAmount, maxAmount);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDoSports(@RequestBody List<DoSportRawDTO> doSportRaws) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = Long.parseLong(authentication.getPrincipal().toString());

            List<DoSportDTO> doSports = new ArrayList<>();
            for (DoSportRawDTO doSportRaw : doSportRaws) {
                Timestamp startTimestamp = new Timestamp(doSportRaw.getStartTime().getTime());
                Timestamp endTimestamp = new Timestamp(doSportRaw.getEndTime().getTime());

                DoSportDTO doSportDTO = new DoSportDTO(doSportRaw.getSportId(), startTimestamp, endTimestamp);
                doSports.add(doSportDTO);
            }

            sportService.addDoSports(userId, doSports);
            return ResponseEntity.ok("Food intakes added successfully.");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: Time overlap detected with existing entry.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing request: " + e.getMessage());
        }
    }
}