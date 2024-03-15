package com.ttt.devicemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "devices")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String qrCode;
    private String deviceCode;
    private String name;
    private String description;
    @Temporal(TemporalType.DATE)
    private Date purchaseDate;
    private String color;
    private String deviceType;
    private String status;
}
