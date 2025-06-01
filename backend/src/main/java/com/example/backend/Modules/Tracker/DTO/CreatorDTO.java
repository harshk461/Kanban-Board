package com.example.backend.Modules.Tracker.DTO;

import lombok.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatorDTO {
    private UUID id;
    private String name;
    private String email;
}
