package com.ttt.devicemanagement.repository;

import com.ttt.devicemanagement.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    @Query("SELECT d FROM Device d WHERE d.status = 'Rảnh'")
    List<Device> findAllByStatusDoNotUse();
}
