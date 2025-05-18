package com.nauHack.backend.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.nauHack.backend.entities.User.ERole;
import com.nauHack.backend.entities.User.Role;
import com.nauHack.backend.repository.RoleRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoleInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        Arrays.stream(ERole.values())
              .filter(role -> !roleRepository.existsByName(role))
              .forEach(role -> {
                  Role newRole = new Role(role);
                  roleRepository.save(newRole);
                  System.out.println("Created role: " + role.name());
              });
    }
}
