package com.nauHack.backend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nauHack.backend.entities.User.ERole;
import com.nauHack.backend.entities.User.Role;
import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.payload.request.LoginRequest;
import com.nauHack.backend.payload.request.SignupRequest;
import com.nauHack.backend.payload.response.JwtResponse;
import com.nauHack.backend.payload.response.MessageResponse;
import com.nauHack.backend.repository.RoleRepository;
import com.nauHack.backend.repository.UserRepository;
import com.nauHack.backend.security.jwt.JwtUtils;
import com.nauHack.backend.service.UserDetailsImpl;
import com.nauHack.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        try {
            MessageResponse response = userService.registerUser(signUpRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Error: " + e.getMessage()));
        }

    }
}