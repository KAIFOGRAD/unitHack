package com.nauHack.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nauHack.backend.entities.User.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
