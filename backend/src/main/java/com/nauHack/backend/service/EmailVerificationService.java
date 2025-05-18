package com.nauHack.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nauHack.backend.entities.VerificationCode;
import com.nauHack.backend.repository.UserRepository;
import com.nauHack.backend.repository.VerificationCodeRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final VerificationCodeRepository codeRepository;
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${spring.mail.username}") 
    private String fromEmail;

    @Value("${app.verification.code.expiry-minutes}")
    private int codeExpiryMinutes;

    public void sendVerificationCode(String email) {
        System.out.println("Attempting to send verification code to: {}" + email);
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (!userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already not in use");
        }

        String code = generateRandomCode();
        
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpiryDate(LocalDateTime.now().plusMinutes(codeExpiryMinutes));
        codeRepository.save(verificationCode);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            
            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject("Код подтверждения");
            helper.setText("Ваш код подтверждения: " + code);
            
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    public boolean verifyCode(String email, String code) {
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }

        Optional<VerificationCode> verificationCode = codeRepository
            .findByEmailAndCodeAndUsedFalse(email, code);
            
        if (verificationCode.isEmpty()) {
            return false;
        }
        
        VerificationCode vCode = verificationCode.get();
        
        if (vCode.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Verification code has expired");
        }
        
        vCode.setUsed(true);
        codeRepository.save(vCode);
        
        return true;
    }

    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    private String generateRandomCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }
}
