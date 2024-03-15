package com.ttt.devicemanagement.repository;

import com.ttt.devicemanagement.entity.DeviceUsage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceUsageRepository extends JpaRepository<DeviceUsage, Long> {
}
