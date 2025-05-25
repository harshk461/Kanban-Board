package com.example.backend.Modules.Orgnisation.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.Modules.Orgnisation.Entity.AppUserToOrg;
import com.example.backend.Modules.Orgnisation.Entity.Organization;

public interface AppUserToOrgRepository extends JpaRepository<AppUserToOrg, UUID> {
    List<AppUserToOrg> findByUserId(UUID userId);

    Optional<AppUserToOrg> findByUserIdAndOrganizationId(UUID userId, UUID orgId);

    @Query(value = """
            SELECT o.*
            FROM app_user_to_org auto
            INNER JOIN organization o ON auto.org_id = o.id
            WHERE auto.user_id = :userId
              AND auto.is_active = true
            """, nativeQuery = true)
    List<Organization> findActiveOrganizationsByUserId(@Param("userId") UUID userId);

}
