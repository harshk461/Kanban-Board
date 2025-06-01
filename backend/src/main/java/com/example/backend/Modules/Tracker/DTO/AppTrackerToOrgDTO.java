package com.example.backend.Modules.Tracker.DTO;

import lombok.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppTrackerToOrgDTO {
    private UUID id;
    private UUID trackerId;
    private UUID orgId;

    private Boolean isActive;
}
