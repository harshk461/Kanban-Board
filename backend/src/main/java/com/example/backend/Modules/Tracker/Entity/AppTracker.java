package com.example.backend.Modules.Tracker.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

import com.example.backend.Common.Entity.BaseEntity;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppTracker extends BaseEntity {

    private String title;

    @ElementCollection
    private Set<String> columns; // E.g., todo, in_progress, done

    @OneToMany(mappedBy = "tracker")
    private Set<AppTrackerToOrg> trackerOrgs;
}
