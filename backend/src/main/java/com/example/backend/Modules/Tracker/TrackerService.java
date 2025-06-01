package com.example.backend.Modules.Tracker;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Auth.Repository.AppUserRepository;
import com.example.backend.Modules.Orgnisation.Entity.Organization;
import com.example.backend.Modules.Orgnisation.Repository.OrginzationRepository;
import com.example.backend.Modules.Tracker.DTO.AppTrackerDTO;
import com.example.backend.Modules.Tracker.DTO.AppTrackerToOrgDTO;
import com.example.backend.Modules.Tracker.DTO.CreatorDTO;
import com.example.backend.Modules.Tracker.Entity.AppTracker;
import com.example.backend.Modules.Tracker.Entity.AppTrackerToOrg;
import com.example.backend.Modules.Tracker.Repository.AppTrackerRepository;
import com.example.backend.Modules.Tracker.Repository.AppTrackerToOrgRepository;

@Service
public class TrackerService {
    private final AppTrackerRepository appTrackerRepository;
    private final AppTrackerToOrgRepository appTrackerToOrgRepository;
    private final OrginzationRepository orginzationRepository;
    private final AppUserRepository appUserRepository;

    TrackerService(AppTrackerRepository appTrackerRepository, AppTrackerToOrgRepository appTrackerToOrgRepository,
            OrginzationRepository orginzationRepository, AppUserRepository appUserRepository) {
        this.appTrackerRepository = appTrackerRepository;
        this.appTrackerToOrgRepository = appTrackerToOrgRepository;
        this.orginzationRepository = orginzationRepository;
        this.appUserRepository = appUserRepository;
    }

    public AppTrackerDTO getTracker(UUID trackerId) {
        AppTracker tracker = appTrackerRepository.findById(trackerId)
                .orElseThrow(() -> new IllegalArgumentException("Tracker doesn't exist with ID: " + trackerId));

        return AppTrackerDTO.builder()
                .id(tracker.getId())
                .title(tracker.getTitle())
                .description(tracker.getDescription())
                .columns(tracker.getColumns())
                .createdBy(CreatorDTO.builder()
                        .id(tracker.getCreatedBy().getId())
                        .name(tracker.getCreatedBy().getName())
                        .email(tracker.getCreatedBy().getEmail())
                        .build())
                .orgId(tracker.getCreatedInOrg().getId()) // assuming org is present
                .build();
    }

    public AppTrackerDTO addNewTracker(UUID orgId, UUID userId, String name, String description, Set<String> columns) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Tracker name cannot be null or empty");
        }

        Optional<AppTracker> existing = appTrackerRepository.findByTitleIgnoreCase(name.toLowerCase());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Tracker with the same name already exists.");
        }

        // Fetch entities
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Organization org = orginzationRepository.findById(orgId)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found with ID: " + orgId));

        String columnString = String.join(",", columns);

        AppTracker tracker = AppTracker.builder()
                .title(name)
                .description(description)
                .columns(columnString)
                .createdBy(user)
                .createdInOrg(org)
                .build();

        AppTracker saved = appTrackerRepository.save(tracker);

        return AppTrackerDTO.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .columns(saved.getColumns())
                .createdBy(CreatorDTO.builder()
                        .id(tracker.getCreatedBy().getId())
                        .name(tracker.getCreatedBy().getName())
                        .email(tracker.getCreatedBy().getEmail())
                        .build())
                .orgId(org.getId())
                .build();
    }

    public List<AppTrackerDTO> getAllOrgTrackers(UUID orgId) {
        List<AppTracker> trackers = appTrackerToOrgRepository.findActiveTrackersByOrgId(orgId);

        return trackers.stream()
                .map((AppTracker tracker) -> AppTrackerDTO.builder()
                        .id(tracker.getId())
                        .title(tracker.getTitle())
                        .description(tracker.getDescription())
                        .columns(tracker.getColumns())
                        .orgId(orgId)
                        .createdBy(CreatorDTO.builder()
                                .id(tracker.getCreatedBy().getId())
                                .name(tracker.getCreatedBy().getName())
                                .email(tracker.getCreatedBy().getEmail())
                                .build())
                        .build())
                .collect(Collectors.toList());

    }

    public AppTrackerToOrgDTO addNewTrackerToOrg(UUID orgId, UUID trackerId) {
        Organization org = orginzationRepository.findById(orgId)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found with ID: " + orgId));

        AppTracker tracker = appTrackerRepository.findById(trackerId)
                .orElseThrow(() -> new IllegalArgumentException("Tracker not found with ID: " + trackerId));

        AppTrackerToOrg trackerToOrg = AppTrackerToOrg.builder()
                .organization(org)
                .tracker(tracker)
                .isActive(true)
                .build();

        AppTrackerToOrg saved = appTrackerToOrgRepository.save(trackerToOrg);

        return AppTrackerToOrgDTO.builder()
                .id(saved.getId())
                .trackerId(trackerId)
                .orgId(orgId)
                .isActive(saved.getIsActive())
                .build();
    }

}
