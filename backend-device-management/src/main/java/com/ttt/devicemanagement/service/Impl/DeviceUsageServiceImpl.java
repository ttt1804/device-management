package com.ttt.devicemanagement.service.Impl;

import com.ttt.devicemanagement.dto.request.DeviceUsageDto;
import com.ttt.devicemanagement.entity.Device;
import com.ttt.devicemanagement.entity.DeviceUsage;
import com.ttt.devicemanagement.entity.Employee;
import com.ttt.devicemanagement.exception.InternalServerException;
import com.ttt.devicemanagement.repository.DeviceRepository;
import com.ttt.devicemanagement.repository.DeviceUsageRepository;
import com.ttt.devicemanagement.repository.EmployeeRepository;
import com.ttt.devicemanagement.service.DeviceService;
import com.ttt.devicemanagement.service.DeviceUsageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceUsageServiceImpl implements DeviceUsageService {
    private final DeviceUsageRepository deviceUsageRepository;
    private final EmployeeRepository employeeRepository;
    private final DeviceRepository deviceRepository;

    @Override
    public List<DeviceUsage> getAllDeviceUsages() {
        return deviceUsageRepository.findAll();
    }


    @Override
    public DeviceUsage addDeviceUsage(DeviceUsageDto deviceUsageDto) {
        Employee employee = employeeRepository.findById(deviceUsageDto.getEmployeeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nhân viên không tồn tại"));

        Device device = deviceRepository.findById(deviceUsageDto.getDeviceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Thiết bị không tồn tại"));

        if (!device.getStatus().equals("Rảnh")) {
            log.error("Device can't use now");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Không thể sử dụng thiết bị lúc này");
        }

        if (employee.getStatus().equals("Nghỉ việc")) {
            throw new InternalServerException("Nhân viên đã nghỉ việc không thể thêm sử dụng thiết bị");
        }

        DeviceUsage deviceUsage = new DeviceUsage();
        deviceUsage.setDevice(device);
        deviceUsage.setEmployee(employee);
        deviceUsage.setStartDate(deviceUsageDto.getStartDate());
        deviceUsage.setEndDate(deviceUsageDto.getEndDate());
        deviceUsage.setComment(deviceUsageDto.getComment());
        deviceUsage.getDevice().setStatus("Đang sử dụng");

        return deviceUsageRepository.save(deviceUsage);
    }


    @Override
    public DeviceUsage getDeviceUsage(Long id) {
        DeviceUsage deviceUsage = deviceUsageRepository.findById(id).orElse(null);
        if(deviceUsage == null) {
            log.error("Device Usage not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Device Usage not found");
        } else {
            return deviceUsage;
        }
    }

    @Override
    public DeviceUsage updateDeviceUsage(Long id, DeviceUsageDto deviceUsageDto) {
        DeviceUsage deviceUsage = deviceUsageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device usage not found"));

        if (deviceUsage.getDevice().getId() != deviceUsageDto.getDeviceId()) {
            log.info("Change use device");

            Device oldDevice = deviceUsage.getDevice();
            oldDevice.setStatus("Rảnh");
            deviceRepository.save(oldDevice);

            Device newDevice = deviceRepository.findById(deviceUsageDto.getDeviceId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "New device not found"));

            newDevice.setStatus("Đang sử dụng");
            deviceUsage.setDevice(newDevice);
        }

        deviceUsage.setEmployee(employeeRepository.findById(deviceUsageDto.getEmployeeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found")));

        deviceUsage.setStartDate(deviceUsageDto.getStartDate());
        deviceUsage.setEndDate(deviceUsageDto.getEndDate());
        deviceUsage.setComment(deviceUsageDto.getComment());

        return deviceUsageRepository.save(deviceUsage);
    }

    @Override
    public String deleteDeviceUsage(Long id) {
        DeviceUsage deviceUsage = deviceUsageRepository.findById(id).orElse(null);
        if (deviceUsage != null) {
            deviceUsage.getDevice().setStatus("Rảnh");
            deviceUsageRepository.delete(deviceUsage);
        }
        return null;

    }
}
