// OrganizationDTO.java
package com.example.backend.Modules.Orgnisation.DTO;

import java.util.UUID;

import lombok.*;

@Builder
@Data
public class OrganizationDTO {
    private UUID id;
    private String name;
    private String description;
    private boolean isCreatedBy;
}
