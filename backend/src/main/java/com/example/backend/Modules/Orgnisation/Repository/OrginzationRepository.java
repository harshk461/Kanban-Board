package com.example.backend.Modules.Orgnisation.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Modules.Orgnisation.Entity.Organization;

public interface OrginzationRepository extends JpaRepository<Organization, UUID> {
}
