package com.ttt.devicemanagement;

import com.ttt.devicemanagement.entity.Role;
import com.ttt.devicemanagement.entity.User;
import com.ttt.devicemanagement.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class DeviceManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeviceManagementApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
//			userService.addRole(new Role(null, "ROLE_ADMIN"));
//			userService.addUser(new User(null, "Administrator", "admin", "1234", new ArrayList<>()));
//			userService.addRoleToUser("admin", "ROLE_ADMIN");
//
//			userService.addRole(new Role(null, "ROLE_USER"));
//			userService.addUser(new User(null, "User", "user", "1234", new ArrayList<>()));
//			userService.addRoleToUser("user", "ROLE_USER");
		};
	}

}
