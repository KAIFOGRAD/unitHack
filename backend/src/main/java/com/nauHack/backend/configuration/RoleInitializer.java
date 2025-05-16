package com.nauHack.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.nauHack.backend.entities.User.ERole;
import com.nauHack.backend.entities.User.Role;
import com.nauHack.backend.repository.RoleRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class RoleInitializer implements CommandLineRunner {

    private RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            Role userRole = new Role(ERole.ROLE_USER);
            roleRepository.save(userRole);
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }
    }
}
