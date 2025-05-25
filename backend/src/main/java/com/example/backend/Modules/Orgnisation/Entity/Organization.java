package com.example.backend.Modules.Orgnisation.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Tracker.Entity.AppTrackerToOrg;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@SuperBuilder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organization extends BaseEntity {

    private String name;

    private String description;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<AppUserToOrg> members;

    @OneToMany(mappedBy = "organization")
    @JsonManagedReference
    private List<AppTrackerToOrg> trackers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", referencedColumnName = "id")
    private AppUser createdBy;
}
