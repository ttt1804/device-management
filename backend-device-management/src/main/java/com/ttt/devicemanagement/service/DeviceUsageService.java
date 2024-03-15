package com.ttt.devicemanagement.service;

import com.ttt.devicemanagement.dto.request.DeviceUsageDto;
import com.ttt.devicemanagement.entity.DeviceUsage;

import java.util.List;

public interface DeviceUsageService {
    public List<DeviceUsage> getAllDeviceUsages();
    public DeviceUsage addDeviceUsage(DeviceUsageDto deviceUsageDto);
    public DeviceUsage getDeviceUsage(Long id);
    public DeviceUsage updateDeviceUsage(Long id, DeviceUsageDto deviceUsageDto);
    public String deleteDeviceUsage(Long id);
}
