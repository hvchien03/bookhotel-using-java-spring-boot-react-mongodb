package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.services.DataService;

@RestController
@RequestMapping("/api/v1/data")
@PreAuthorize("hasRole('ADMIN')")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/backup")
    public ResponseEntity<?> backupData() {
        return ResponseEntity.ok(dataService.backupData("D:\\backupmongodb"));
    }

    @GetMapping("/restore")
    public ResponseEntity<?> restoreData() {
        return ResponseEntity.ok(dataService.restoreData("D:\\backupmongodb"));
    }

}
