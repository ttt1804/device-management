package com.ttt.devicemanagement.controller;

import com.ttt.devicemanagement.dto.request.DeviceUsageDto;
import com.ttt.devicemanagement.service.DeviceUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/device-usages")
@RequiredArgsConstructor
public class DeviceUsageController {
    private final DeviceUsageService deviceUsageService;

    @GetMapping()
    public ResponseEntity<?> getAllDeviceUsages() {
        return new ResponseEntity<>(deviceUsageService.getAllDeviceUsages(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeviceUsage(@PathVariable("id") Long id) {
        return new ResponseEntity<>(deviceUsageService.getDeviceUsage(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addDeviceUsage(@RequestBody DeviceUsageDto deviceUsageDto) {
        return new ResponseEntity<>(deviceUsageService.addDeviceUsage(deviceUsageDto), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeviceUsage(@PathVariable("id") Long id, @RequestBody DeviceUsageDto deviceUsageDto) {
        return new ResponseEntity<>(deviceUsageService.updateDeviceUsage(id, deviceUsageDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeviceUsage(@PathVariable Long id) {
        return new ResponseEntity<>(deviceUsageService.deleteDeviceUsage(id), HttpStatus.OK);
    }

}
