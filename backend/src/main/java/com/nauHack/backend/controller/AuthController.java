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
import com.nauHack.backend.payload.request.EmailRequest;
import com.nauHack.backend.payload.request.EmailVerificationRequest;
import com.nauHack.backend.payload.request.LoginRequest;
import com.nauHack.backend.payload.request.SignupRequest;
import com.nauHack.backend.payload.response.JwtResponse;
import com.nauHack.backend.payload.response.MessageResponse;
import com.nauHack.backend.repository.RoleRepository;
import com.nauHack.backend.repository.UserRepository;
import com.nauHack.backend.security.jwt.JwtUtils;
import com.nauHack.backend.service.EmailVerificationService;
import com.nauHack.backend.service.UserDetailsImpl;
import com.nauHack.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final EmailVerificationService emailVerificationService;
    private final UserRepository userRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("Registration attempt for: " + signUpRequest.getEmail());

        boolean emailExists = userRepository.existsByEmail(signUpRequest.getEmail());
        System.out.println("Email exists check result: " + emailExists);

        if (emailExists) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        try {
            User user = userService.registerUser(signUpRequest);
            emailVerificationService.sendVerificationCode(signUpRequest.getEmail());
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            System.out.println("Registration error: " + e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new MessageResponse("Registration failed"));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody EmailVerificationRequest verificationRequest) {
        try {
            boolean verified = emailVerificationService.verifyCode(
                    verificationRequest.getEmail(),
                    verificationRequest.getCode());

            if (verified) {
                userService.activateUser(verificationRequest.getEmail());
                return ResponseEntity.ok(new MessageResponse("Email verified successfully!"));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Invalid verification code"));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/resend-code")
    public ResponseEntity<?> resendVerificationCode(@Valid @RequestBody EmailRequest emailRequest) {
        try {
            emailVerificationService.sendVerificationCode(emailRequest.getEmail());
            return ResponseEntity.ok(new MessageResponse("New verification code sent"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}