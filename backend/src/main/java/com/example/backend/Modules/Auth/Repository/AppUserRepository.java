package com.example.backend.Modules.Auth.Repository;

import com.example.backend.Modules.Auth.Entity.AppUser;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    AppUser findByEmail(String email);
}
