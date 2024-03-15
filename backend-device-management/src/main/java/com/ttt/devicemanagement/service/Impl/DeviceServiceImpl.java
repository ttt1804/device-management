package com.ttt.devicemanagement.service.Impl;

import com.google.zxing.WriterException;
import com.ttt.devicemanagement.dto.request.DeviceDto;
import com.ttt.devicemanagement.entity.Device;
import com.ttt.devicemanagement.exception.DeviceAlreadyExitsException;
import com.ttt.devicemanagement.exception.EmployeeAlreadyExistsException;
import com.ttt.devicemanagement.repository.DeviceRepository;
import com.ttt.devicemanagement.service.DeviceService;
import com.ttt.devicemanagement.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceServiceImpl implements DeviceService {
    private final DeviceRepository deviceRepository;
    private final FileService fileService;
    @Transactional
    @Override
    public Device addDevice(DeviceDto deviceDto) throws IOException, WriterException {
        if( deviceDto != null) {
            Device device = new Device();
            String uuid = UUID.randomUUID().toString();
            String deviceCode = uuid.substring(uuid.length() - 8);
            device.setDeviceCode(deviceCode);
            device.setName(deviceDto.getName());
            device.setDescription(deviceDto.getDescription());
            device.setPurchaseDate(deviceDto.getPurchaseDate());
            device.setColor(deviceDto.getColor());
            device.setDeviceType(deviceDto.getDeviceType());
            device.setStatus(deviceDto.getStatus());
            device.setQrCode(fileService.generateAndUploadQRCode(device));
            return deviceRepository.save(device);
        }
        return null;
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public List<Device> getAllDeviceDoNotUse() {
        return deviceRepository.findAllByStatusDoNotUse();
    }

    @Override
    public Device getDevice(Long id) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device == null) {
            log.error("Can't found device");
            throw new EmployeeAlreadyExistsException("Can't found device in database");
        } else {
            return device;
        }
    }

    @Override
    public Device updateDevice(Long id, DeviceDto deviceDto) throws IOException, WriterException {
        Device exitingDevice = deviceRepository.findById(id).orElse(null);
        if (exitingDevice != null) {
            if(!checkChangeUpdate(exitingDevice, deviceDto)){
                exitingDevice.setQrCode(fileService.updateQRCode(exitingDevice));
            }
            exitingDevice.setName(deviceDto.getName());
            exitingDevice.setDescription(deviceDto.getDescription());
            exitingDevice.setPurchaseDate(deviceDto.getPurchaseDate());
            exitingDevice.setColor(deviceDto.getColor());
            exitingDevice.setDeviceType(deviceDto.getDeviceType());
            exitingDevice.setStatus(deviceDto.getStatus());
            deviceRepository.save(exitingDevice);
        } else {
            log.error("Can't found device");
            throw new DeviceAlreadyExitsException("Can't found device");
        }

        return null;
    }

    @Override
    public String deleteDevice(Long id) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device != null) {
            if(Objects.equals(device.getStatus(), "Đang sử dụng")){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thiết bị đang sử dụng không thể xóa");
            }
            fileService.deleteFile(device.getQrCode());
            deviceRepository.delete(device);
        } else {
            log.error("Can't found device");
            throw  new DeviceAlreadyExitsException("Can't found device");
        }
        return null;
    }

    public boolean checkChangeUpdate(Device device, DeviceDto deviceDto) {
        if(!Objects.equals(device.getName(), deviceDto.getName())){
            return false;
        }
        if(!Objects.equals(device.getDeviceCode(), deviceDto.getDeviceCode())) {
            return false;
        }
        if(!Objects.equals(device.getColor(), deviceDto.getColor())) {
            return false;
        }
        if(!Objects.equals(device.getDeviceType(), deviceDto.getDeviceType())) {
            return false;
        }

        java.util.Date utilDatePurchaseDeviceDto = deviceDto.getPurchaseDate();
        java.sql.Date sqlDatePurchaseDto = new java.sql.Date(utilDatePurchaseDeviceDto.getTime());

        String purchaseDeviceDto = sqlDatePurchaseDto.toString();
        String purchaseDevice = device.getPurchaseDate().toString();
        if(!purchaseDevice.equals(purchaseDeviceDto)) {
            return false;
        }
        return true;
    }
}
