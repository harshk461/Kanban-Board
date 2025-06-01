package com.example.backend.Modules.Auth;

import com.example.backend.Common.JwtUtil;
import com.example.backend.Modules.Auth.DTO.ProfileDTO;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Auth.Repository.AppUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String login(String email, String password) {
        AppUser user = appUserRepository.findUserByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate JWT token
        return jwtUtil.generateToken(user.getId().toString(), user.getEmail());
    }

    public AppUser signup(String name, String email, String phone, String profile, String password) {
        if (appUserRepository.findByEmail(email) != null) {
            throw new RuntimeException("User already exists");
        }

        String hashedPassword = passwordEncoder.encode(password);

        AppUser user = AppUser.builder()
                .name(name)
                .email(email)
                .password(hashedPassword)
                .phone(phone)
                .profileImage(profile)
                .build();

        return appUserRepository.save(user);
    }

    public ProfileDTO getProfile(String email) {
        AppUser user = appUserRepository.findUserByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return ProfileDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .profile(user.getProfileImage())
                .phone(user.getPhone())
                .build();
    }
}
