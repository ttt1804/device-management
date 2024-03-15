package com.ttt.devicemanagement.service;

import com.ttt.devicemanagement.dto.request.EmployeeDto;
import com.ttt.devicemanagement.entity.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee addEmployee(EmployeeDto employeeDto);
    public List<Employee> getAllEmployees();
    public List<Employee> getAllEmployeesDoWork();
    public Employee getEmployee(Long id);
    public Employee updateEmployee(Long id, EmployeeDto employeeDto);
    public String deleteEmployee(Long id);
    public Boolean checkExitEmail(String email);
    public Boolean checkExitPhoneNumber(String phoneNumber);
}
