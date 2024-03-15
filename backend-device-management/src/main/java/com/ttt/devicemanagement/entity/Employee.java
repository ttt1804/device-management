package com.ttt.devicemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeCode;
    private String fullName;
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;
    private String email;
    private String phoneNumber;
    @Temporal(TemporalType.DATE)
    private Date joinDate;
    @Temporal(TemporalType.DATE)
    private Date resignationDate;
    private String status;

}

