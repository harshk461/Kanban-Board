package com.example.backend.Modules.Auth.Entity;

import java.util.Set;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Orgnisation.Entity.AppUserToOrg;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser extends BaseEntity {

    private String name;
    private String phone;
    private String email;
    private String password; // Hashed
    private String profileImage;

    @OneToMany(mappedBy = "user")
    private Set<AppUserToOrg> userOrgs;
}
