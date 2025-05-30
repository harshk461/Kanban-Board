package com.example.backend.Modules.Orgnisation.Entity;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUserToOrg extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "org_id")
    @JsonBackReference
    private Organization organization;

    private boolean isActive;
}
