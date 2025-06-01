package com.example.backend.Modules.Tracker;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Common.JwtUtil;
import com.example.backend.Modules.Tracker.DTO.AppTrackerDTO;
import com.example.backend.Modules.Tracker.DTO.AppTrackerToOrgDTO;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tracker")
@RequiredArgsConstructor
@CrossOrigin
public class TrackerController {

    private final TrackerService trackerService;
    private final JwtUtil jwtUtil;

    @GetMapping("{trackerId}")
    public AppTrackerDTO getTracker(@PathVariable UUID trackerId) {
        return trackerService.getTracker(trackerId);
    }

    @GetMapping("org-trackers")
    public List<AppTrackerDTO> getAllOrgTrackers(@RequestParam("orgId") UUID orgId) {
        return trackerService.getAllOrgTrackers(orgId);
    }

    @PostMapping("add-tracker")
    public AppTrackerDTO addNewTracker(@RequestParam("orgId") UUID orgId, @RequestBody AddNewTrackerBody body,
            HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID userId = jwtUtil.extractUserId(token);
        return trackerService.addNewTracker(orgId, userId, body.name, body.description, body.columns);
    }

    @PostMapping("/{orgId}/add-tracker-to-org/{trackerId}")
    public AppTrackerToOrgDTO addTrackerToOrg(@PathVariable UUID orgId, @PathVariable UUID trackerId) {
        return trackerService.addNewTrackerToOrg(orgId, trackerId);
    }

    public static record AddNewTrackerBody(String name, String description, Set<String> columns) {
    }

}