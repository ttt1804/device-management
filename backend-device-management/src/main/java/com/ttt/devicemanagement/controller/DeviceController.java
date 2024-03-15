package com.ttt.devicemanagement.controller;

import com.google.zxing.WriterException;
import com.ttt.devicemanagement.dto.request.DeviceDto;
import com.ttt.devicemanagement.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/devices")
public class DeviceController {
    private final DeviceService deviceService;
    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        return new ResponseEntity<>(deviceService.getAllDevices(), HttpStatus.OK);
    }
    @GetMapping("/do-not-use")
    public ResponseEntity<?> getAllDevicesDoNotUse() {
        return new ResponseEntity<>(deviceService.getAllDeviceDoNotUse(), HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<?> addDevice(@RequestBody DeviceDto deviceDto) throws IOException, WriterException {
        return new ResponseEntity<>(deviceService.addDevice(deviceDto), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable("id") Long id,@RequestBody DeviceDto deviceDto) throws IOException, WriterException {
        return new ResponseEntity<>(deviceService.updateDevice(id, deviceDto), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable("id") Long id) {
        return new ResponseEntity<>(deviceService.deleteDevice(id), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDevice(@PathVariable("id") Long id) {
        return new ResponseEntity<>(deviceService.getDevice(id), HttpStatus.OK);
    }
}
