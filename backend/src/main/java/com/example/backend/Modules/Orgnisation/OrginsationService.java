package com.example.backend.Modules.Orgnisation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Auth.Repository.AppUserRepository;
import com.example.backend.Modules.Orgnisation.DTO.AppUserToOrgDTO;
import com.example.backend.Modules.Orgnisation.DTO.OrganizationDTO;
import com.example.backend.Modules.Orgnisation.Entity.AppUserToOrg;
import com.example.backend.Modules.Orgnisation.Entity.Organization;
import com.example.backend.Modules.Orgnisation.Repository.AppUserToOrgRepository;
import com.example.backend.Modules.Orgnisation.Repository.OrginzationRepository;

@Service
public class OrginsationService {
        private final OrginzationRepository orginzationRepository;
        private final AppUserToOrgRepository appUserToOrgRepository;
        private final AppUserRepository appUserRepository;

        public OrginsationService(AppUserToOrgRepository appUserToOrgRepository,
                        OrginzationRepository orginzationRepository, AppUserRepository appUserRepository) {
                this.appUserToOrgRepository = appUserToOrgRepository;
                this.orginzationRepository = orginzationRepository;
                this.appUserRepository = appUserRepository;
        }

        public List<OrganizationDTO> getAllUserOrginzations(UUID userId) {
                List<Organization> organizations = appUserToOrgRepository.findActiveOrganizationsByUserId(userId);

                return organizations.stream()
                                .map(org -> {
                                        UUID creatorId = org.getCreatedBy() != null ? org.getCreatedBy().getId() : null;
                                        return OrganizationDTO.builder()
                                                        .id(org.getId())
                                                        .name(org.getName())
                                                        .description(org.getDescription())
                                                        .isCreatedBy(userId.equals(creatorId))
                                                        .build();
                                })
                                .collect(Collectors.toList());
        }

        public AppUserToOrgDTO addUserToOrganization(UUID userId, UUID orgId) {
                AppUser user = AppUser.builder().id(userId).build();
                Organization organization = Organization.builder().id(orgId).build();

                Optional<AppUserToOrg> existing = appUserToOrgRepository.findByUserIdAndOrganizationId(userId, orgId);
                if (existing.isPresent()) {
                        throw new IllegalStateException("User already in organization");
                }

                AppUserToOrg mapping = AppUserToOrg.builder()
                                .user(user)
                                .organization(organization)
                                .isActive(true)
                                .build();

                AppUserToOrg saved = appUserToOrgRepository.save(mapping);

                return AppUserToOrgDTO.builder()
                                .id(saved.getId())
                                .userId(saved.getUser().getId())
                                .orgId(saved.getOrganization().getId())
                                .isActive(saved.isActive())
                                .build();
        }

        public OrganizationDTO addNewOrganization(String name, String description, UUID userId) {
                AppUser creator = appUserRepository.findById(
                                userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

                Organization org = Organization.builder()
                                .name(name)
                                .description(description)
                                .createdBy(creator)
                                .build();

                Organization saved = orginzationRepository.save(org);

                AppUserToOrg userToOrg = AppUserToOrg.builder()
                                .user(creator)
                                .organization(saved)
                                .isActive(true)
                                .build();
                appUserToOrgRepository.save(userToOrg);

                return OrganizationDTO.builder()
                                .id(saved.getId())
                                .name(saved.getName())
                                .description(saved.getDescription())
                                .build();
        }

        public UUID getUserIdByEmail(String email) {
                AppUser user = appUserRepository.findByEmail(email).orElseThrow();
                return user.getId();
        }
}
