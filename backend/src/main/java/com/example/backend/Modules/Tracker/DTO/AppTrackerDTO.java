package com.example.backend.Modules.Tracker.DTO;

import lombok.*;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppTrackerDTO {
    private UUID id;
    private String title;
    private String description;
    private String columns;
    private UUID orgId;

    private CreatorDTO createdBy; // new nested DTO
}
