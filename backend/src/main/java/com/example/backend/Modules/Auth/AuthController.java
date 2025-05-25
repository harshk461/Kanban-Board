package com.example.backend.Modules.Auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            authService.signup(signupRequest.name, signupRequest.email, signupRequest.phone, signupRequest.profile,
                    signupRequest.password);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.email, loginRequest.password);
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // DTO classes for request and response (could be separate files)

    public static record SignupRequest(String name, String email, String phone, String password, String profile) {
    }

    public static record LoginRequest(String email, String password) {
    }

    public static record JwtResponse(String token) {
    }
}
