package com.example.backend.Common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {

    // Use a secure secret key (in real apps, move to env var or config)
    private static final String SECRET = "E9sDGVzMNQz3Rm2ZykShwVv5WYk7nIrxDQaQ7ZguJZ0=";
    private static final Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET));
    private static final long EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000;

    public static String generateToken(String userId, String email) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(key)
                .compact();
    }

    // ✅ Extract all claims
    public static Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Extract userId (subject)
    public static String extractUserId(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ Extract custom claim (e.g., email)
    public static String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    // ✅ Optional: check if token is expired
    public static boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
