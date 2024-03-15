package com.ttt.devicemanagement.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class DeviceUsageDto {
    private Long employeeId;
    private Long deviceId;
    private Date startDate;
    private Date endDate;
    private String comment;
}
