package com.ttt.devicemanagement.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class EmployeeDto {
    private String employeeCode;
    private String fullName;
    private Date dateOfBirth;
    private String email;
    private String phoneNumber;
    private Date joinDate;
    private Date resignationDate;
    private String status;
}