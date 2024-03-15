package com.ttt.devicemanagement.service;

import com.ttt.devicemanagement.entity.Role;
import com.ttt.devicemanagement.entity.User;

public interface UserService {
    void addUser(User user);
    void addRole(Role role);
    void addRoleToUser(String username, String roleName);
}
