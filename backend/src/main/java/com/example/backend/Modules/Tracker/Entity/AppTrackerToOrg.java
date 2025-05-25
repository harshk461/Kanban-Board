package com.example.backend.Modules.Tracker.Entity;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Orgnisation.Entity.Organization;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppTrackerToOrg extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "org_id")
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "tracker_id")
    private AppTracker tracker;
}
