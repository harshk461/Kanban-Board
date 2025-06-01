package com.example.backend.Modules.Tracker.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.Modules.Tracker.Entity.AppTracker;
import com.example.backend.Modules.Tracker.Entity.AppTrackerToOrg;

public interface AppTrackerToOrgRepository extends JpaRepository<AppTrackerToOrg, UUID> {
    @Query("SELECT ato.tracker FROM AppTrackerToOrg ato WHERE ato.organization.id = :orgId AND ato.isActive = true")
    List<AppTracker> findActiveTrackersByOrgId(@Param("orgId") UUID orgId);
}
