package com.example.backend.Modules.Tasks.DTO;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppTaskDTO {
    private UUID id;
    private String title;
    private String description;
    private String status;
    private Integer position;
    private UUID trackerId;

}
