package com.example.backend.Modules.Auth.Repository;

import com.example.backend.Modules.Auth.Entity.AppUser;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    Optional<AppUser> findByEmail(String email);

    AppUser findUserByEmail(String email);
}
