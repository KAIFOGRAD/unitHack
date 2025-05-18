package com.nauHack.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import com.nauHack.backend.entities.User.User;
import com.nauHack.backend.entities.User.ERole;
import com.nauHack.backend.entities.User.Role;
import com.nauHack.backend.entities.VerificationCode;
import com.nauHack.backend.payload.request.LoginRequest;
import com.nauHack.backend.payload.request.SignupRequest;
import com.nauHack.backend.payload.response.JwtResponse;
import com.nauHack.backend.payload.response.MessageResponse;
import com.nauHack.backend.repository.RoleRepository;
import com.nauHack.backend.repository.UserRepository;
import com.nauHack.backend.repository.VerificationCodeRepository;
import com.nauHack.backend.security.jwt.JwtUtils;
import com.nauHack.backend.service.UserDetailsImpl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class, noRollbackFor = IllegalArgumentException.class)
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final JavaMailSender mailSender;

    private static final int CODE_EXPIRATION_MINUTES = 30;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.isActive()) {
            throw new IllegalArgumentException("Account is not activated. Please verify your email first.");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(jwt,
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);
    }

    public void activateUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        user.setActive(true);
        userRepository.save(user);
    }

    @Transactional
    public User registerUser(SignupRequest signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setActive(false);

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role not found")));

        user.setRoles(roles);

        return userRepository.save(user); 
    }

    public void sendVerificationEmail(String email) {
        String code = generateVerificationCode();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpiryDate(LocalDateTime.now().plusMinutes(CODE_EXPIRATION_MINUTES));
        verificationCodeRepository.save(verificationCode);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(email);
            helper.setSubject("Email Verification Code");
            helper.setText("Your verification code is: " + code);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    public MessageResponse verifyEmail(String email, String code) {
        Optional<VerificationCode> verificationCodeOpt = verificationCodeRepository
                .findByEmailAndCodeAndUsedFalse(email, code);

        if (verificationCodeOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid verification code");
        }

        VerificationCode verificationCode = verificationCodeOpt.get();

        if (verificationCode.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Verification code has expired");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setActive(true);
        userRepository.save(user);

        verificationCode.setUsed(true);
        verificationCodeRepository.save(verificationCode);

        return new MessageResponse("Email verified successfully!");
    }

    public MessageResponse resendVerificationCode(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email not found");
        }

        verificationCodeRepository.deleteByEmail(email);

        sendVerificationEmail(email);

        return new MessageResponse("New verification code sent to your email");
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    private Set<Role> processRolesWithValidation(Set<String> strRoles) {
        Set<Role> roles = new HashSet<>();

        try {
            if (strRoles == null || strRoles.isEmpty()) {
                roles.add(getValidatedRole(ERole.ROLE_USER));
            } else {
                for (String roleStr : strRoles) {
                    ERole roleEnum = ERole.valueOf("ROLE_" + roleStr.toUpperCase());
                    roles.add(getValidatedRole(roleEnum));
                }
            }
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role specified: " + e.getMessage());
        }

        return roles;
    }

    private Role getValidatedRole(ERole role) {
        return roleRepository.findByName(role)
                .orElseThrow(() -> new IllegalStateException("Role " + role + " not found in database"));
    }
}