package com.ttt.devicemanagement.repository;

import com.ttt.devicemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByEmail(String email);
    Employee findByPhoneNumber(String phoneNumber);

    @Query("SELECT e FROM Employee e WHERE e.status = 'Đang làm việc'")
    List<Employee> findByStatusDoWork();

    @Query("SELECT CASE WHEN COUNT(du) > 0 THEN true ELSE false END FROM DeviceUsage du WHERE du.employee.id = :employeeId")
    Boolean checkEmployeeUseDevice(@Param("employeeId") Long employeeId);
}
