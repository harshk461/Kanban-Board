package com.example.backend.Modules.Orgnisation.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Tracker.Entity.AppTrackerToOrg;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "organization")
    private Set<AppUserToOrg> members;

    @OneToMany(mappedBy = "organization")
    private Set<AppTrackerToOrg> trackers;
}
