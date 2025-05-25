// AppUserToOrgDTO.java
package com.example.backend.Modules.Orgnisation.DTO;

import java.util.UUID;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppUserToOrgDTO {
    private UUID id;
    private UUID userId;
    private UUID orgId;
    private boolean isActive;
}
