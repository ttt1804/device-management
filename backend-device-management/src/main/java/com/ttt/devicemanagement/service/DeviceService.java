package com.ttt.devicemanagement.service;

import com.google.zxing.WriterException;
import com.ttt.devicemanagement.dto.request.DeviceDto;
import com.ttt.devicemanagement.entity.Device;

import java.io.IOException;
import java.util.List;

public interface DeviceService {
    public Device addDevice(DeviceDto deviceDto) throws IOException, WriterException;
    public List<Device> getAllDevices();
    public List<Device> getAllDeviceDoNotUse();
    public Device getDevice(Long id);
    public Device updateDevice(Long id, DeviceDto deviceDto) throws IOException, WriterException;
    public String deleteDevice(Long id);

}
