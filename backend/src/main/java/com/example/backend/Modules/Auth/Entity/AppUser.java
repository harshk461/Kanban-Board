package com.example.backend.Modules.Auth.Entity;

import java.util.List;
import java.util.Set;

import com.example.backend.Common.Entity.BaseEntity;
import com.example.backend.Modules.Orgnisation.Entity.AppUserToOrg;
import com.example.backend.Modules.Orgnisation.Entity.Organization;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AppUser extends BaseEntity {

    private String name;
    private String phone;
    private String email;
    private String password; // Hashed
    private String profileImage;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<AppUserToOrg> organizations;
}
