package com.nauHack.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nauHack.backend.entities.VerificationCode;
import com.nauHack.backend.repository.UserRepository;
import com.nauHack.backend.repository.VerificationCodeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final VerificationCodeRepository codeRepository;
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${app.verification.code.expiry-minutes}")
    private int codeExpiryMinutes;

    public void sendVerificationCode(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already in use");
        }

        String code = generateRandomCode();
        
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpiryDate(LocalDateTime.now().plusMinutes(codeExpiryMinutes));
        codeRepository.save(verificationCode);

        sendEmail(email, "Your verification code", "Your verification code is: " + code);
    }

    public boolean verifyCode(String email, String code) {
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

    private String generateRandomCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
