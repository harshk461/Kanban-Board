package com.example.backend.Modules.Tracker.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Modules.Tracker.Entity.AppTracker;

// Example
@Repository
public interface AppTrackerRepository extends JpaRepository<AppTracker, UUID> {
    Optional<AppTracker> findByTitleIgnoreCase(String title);
}
