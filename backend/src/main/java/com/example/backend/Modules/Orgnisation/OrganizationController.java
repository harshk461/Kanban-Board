package com.example.backend.Modules.Orgnisation;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Common.JwtUtil;
import com.example.backend.Common.Response;
import com.example.backend.Modules.Orgnisation.DTO.OrganizationDTO;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/organization")
@RequiredArgsConstructor
@CrossOrigin
public class OrganizationController {

    private final OrginsationService organizationService;

    // Get all organizations for a user
    @GetMapping("/user")
    public ResponseEntity<Response<List<OrganizationDTO>>> getUserOrganizations(HttpServletRequest request) {
        UUID userId = getUserIdFromRequest(request);
        List<OrganizationDTO> organizations = organizationService.getAllUserOrginzations(userId);
        return ResponseEntity.ok(new Response<>(200, organizations, "Organizations fetched successfully"));
    }

    // Add user to organization
    @PostMapping("/{orgId}/add-user")
    public ResponseEntity<Response<String>> addUserToOrganization(
            @PathVariable UUID orgId,
            HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7); // Remove "Bearer "
            String email = JwtUtil.extractEmail(token);
            UUID userId = organizationService.getUserIdByEmail(email);

            organizationService.addUserToOrganization(userId, orgId);

            return ResponseEntity.ok(new Response<>(200, null, "User added to organization successfully"));

        } catch (IllegalStateException e) {
            return buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (ExpiredJwtException e) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Token has expired");
        } catch (MalformedJwtException e) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid token");
        } catch (JwtException e) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED, "JWT error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong");
        }
    }

    @PostMapping
    public ResponseEntity<Response<OrganizationDTO>> createOrganization(@RequestBody createOrganizationDTO body,
            HttpServletRequest request) {
        UUID user_id = getUserIdFromRequest(request);
        OrganizationDTO org = organizationService.addNewOrganization(body.name, body.description, user_id);
        return ResponseEntity.ok(new Response<>(200, org, "Organization created successfully"));
    }

    private <T> ResponseEntity<Response<T>> buildErrorResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new Response<>(status.value(), null, message));
    }

    public static record createOrganizationDTO(String name, String description) {
    }

    public UUID getUserIdFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer "
        String email = JwtUtil.extractEmail(token);
        UUID userId = organizationService.getUserIdByEmail(email);

        return userId;
    }
}
