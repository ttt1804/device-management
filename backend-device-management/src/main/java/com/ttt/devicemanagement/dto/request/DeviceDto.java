package com.ttt.devicemanagement.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class DeviceDto {
    private String qrCode;
    private String deviceCode;
    private String name;
    private String description;
    private Date purchaseDate;
    private String color;
    private String deviceType;
    private String status;
}
