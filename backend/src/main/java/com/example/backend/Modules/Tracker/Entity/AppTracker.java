package com.example.backend.Modules.Tracker.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;
import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Orgnisation.Entity.Organization;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppTracker extends BaseEntity {

    private String title;

    private String description;

    private String columns;

    @OneToMany(mappedBy = "tracker")
    private Set<AppTrackerToOrg> trackerOrgs;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", referencedColumnName = "id")
    private AppUser createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_in_org_id", referencedColumnName = "id")
    private Organization createdInOrg;
}
