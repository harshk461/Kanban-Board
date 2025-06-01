package com.example.backend.Modules.Tasks.Entity;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Tracker.Entity.AppTracker;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppTask extends BaseEntity {

    private String title;
    private String description;
    private String status;
    private Integer position;

    @ManyToOne
    @JoinColumn(name = "tracker_id")
    private AppTracker tracker;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private AppUser createdBy;
}
