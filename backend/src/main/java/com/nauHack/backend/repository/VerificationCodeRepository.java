package com.nauHack.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nauHack.backend.entities.VerificationCode;

import jakarta.transaction.Transactional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmailAndCodeAndUsedFalse(String email, String code);

    Optional<VerificationCode> findTopByEmailOrderByExpiryDateDesc(String email);

    @Transactional
    void deleteByEmail(String email);
}