package com.ttt.devicemanagement.service.Impl;

import com.ttt.devicemanagement.dto.request.DeviceDto;
import com.ttt.devicemanagement.dto.request.EmployeeDto;
import com.ttt.devicemanagement.entity.Device;
import com.ttt.devicemanagement.entity.Employee;
import com.ttt.devicemanagement.exception.EmployeeAlreadyExistsException;
import com.ttt.devicemanagement.exception.InternalServerException;
import com.ttt.devicemanagement.exception.PhoneNumberAlreadyExitsException;
import com.ttt.devicemanagement.repository.EmployeeRepository;
import com.ttt.devicemanagement.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    @Override
    public Employee addEmployee(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }

        Boolean isExistingPhoneNumber = checkExitPhoneNumber(employeeDto.getPhoneNumber());
        Boolean isExistingEmail = checkExitEmail(employeeDto.getEmail());

        if (isExistingEmail) {
            log.error("Email already exists");
            throw new EmployeeAlreadyExistsException("Email đã tồn tại");
        }
        if (isExistingPhoneNumber) {
            log.error("Phone number already exists");
            throw new PhoneNumberAlreadyExitsException("Số điện thoại đã tồn tại");
        }

        String uuid = UUID.randomUUID().toString();
        String employeeCode = uuid.substring(uuid.length() - 8);

        Employee employee = new Employee();
        employee.setEmployeeCode(employeeCode);
        employee.setFullName(employeeDto.getFullName());
        employee.setDateOfBirth(employeeDto.getDateOfBirth());
        employee.setEmail(employeeDto.getEmail());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setJoinDate(employeeDto.getJoinDate());
        employee.setStatus("Đang làm việc");

        return employeeRepository.save(employee);
    }


    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> getAllEmployeesDoWork() {
        return employeeRepository.findByStatusDoWork();
    }

    @Override
    public Employee getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        if( employee == null ) {
            log.error("Can't found employee in database");
            throw new EmployeeAlreadyExistsException("Không tìm thấy nhân viên");
        } else {
            return employee;
        }
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Can't find employee");
                    return new EmployeeAlreadyExistsException("Không tìm thấy nhân viên");
                });

        if (checkChangeUpdateEmail(existingEmployee, employeeDto)) {
            Boolean isExistingEmail = checkExitEmail(employeeDto.getEmail());
            if (isExistingEmail) {
                log.error("Email already exists");
                throw new EmployeeAlreadyExistsException("Email đã tồn tại");
            }
            existingEmployee.setEmail(employeeDto.getEmail());
        }



        if (checkChangeUpdatePhoneNumber(existingEmployee, employeeDto)) {
            Boolean isExistingPhoneNumber = checkExitPhoneNumber(employeeDto.getPhoneNumber());
            if (isExistingPhoneNumber) {
                log.error("Phone number already exists");
                throw new PhoneNumberAlreadyExitsException("Số điện thoại đã tồn tại");
            }
            existingEmployee.setPhoneNumber(employeeDto.getPhoneNumber());
        }

        existingEmployee.setFullName(employeeDto.getFullName());
        existingEmployee.setDateOfBirth(employeeDto.getDateOfBirth());
        existingEmployee.setJoinDate(employeeDto.getJoinDate());

        if(Objects.equals(employeeDto.getStatus(), "Đang làm việc")) {
            existingEmployee.setResignationDate(null);
        } else {
            if(employeeRepository.checkEmployeeUseDevice(existingEmployee.getId())) {
                log.error("Employee is using device");
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nhân viên đang sử dụng thiết bị không thể cho nghỉ việc");
            }
            existingEmployee.setResignationDate(employeeDto.getResignationDate());
        }
        existingEmployee.setStatus(employeeDto.getStatus());


        return employeeRepository.save(existingEmployee);
    }


    @Override
    public String deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        if( employee != null) {
            if(employeeRepository.checkEmployeeUseDevice(id)) {
                log.error("Employee is using device");
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể xóa nhân viên đang sử dụng thiết bị");
            }
            employeeRepository.delete(employee);

        } else {
            log.error("Can't found employee");
            throw new EmployeeAlreadyExistsException("Không tìm thấy nhân viên");
        }
        return null;
    }

    @Override
    public Boolean checkExitEmail(String email) {
        if( employeeRepository.findByEmail(email) != null) {
            return true;
        }
        return false;

    }

    @Override
    public Boolean checkExitPhoneNumber(String phoneNumber) {
        if(employeeRepository.findByPhoneNumber(phoneNumber) != null) {
            return true;
        }
        return false;
    }

    public Boolean checkChangeUpdateEmail(Employee employee, EmployeeDto employeeDto) {
        if(Objects.equals(employee.getEmail(), employeeDto.getEmail())) {
            return false;
        }
        return true;
    }

    public Boolean checkChangeUpdatePhoneNumber(Employee employee, EmployeeDto employeeDto) {
        if(Objects.equals(employee.getPhoneNumber(), employeeDto.getPhoneNumber())) {
            return false;
        }
        return true;
    }
}
