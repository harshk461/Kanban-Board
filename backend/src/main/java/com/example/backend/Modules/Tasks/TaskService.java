package com.example.backend.Modules.Tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.Common.Response;
import com.example.backend.Modules.Auth.Entity.AppUser;
import com.example.backend.Modules.Auth.Repository.AppUserRepository;
import com.example.backend.Modules.Tasks.DTO.AppTaskDTO;
import com.example.backend.Modules.Tasks.Entity.AppTask;
import com.example.backend.Modules.Tasks.Repository.AppTaskRepository;
import com.example.backend.Modules.Tracker.Entity.AppTracker;
import com.example.backend.Modules.Tracker.Repository.AppTrackerRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
        private final AppTaskRepository appTaskRepository;
        private final AppTrackerRepository appTrackerRepository;
        private final AppUserRepository appUserRepository;
        private final SimpMessagingTemplate messagingTemplate;

        @PersistenceContext
        private EntityManager entityManager;

        public List<AppTaskDTO> getAllTasks(UUID trackerId) {
                String jpql = "SELECT t FROM AppTask t WHERE t.tracker.id = :trackerId ORDER BY t.status ASC, t.position ASC";
                List<AppTask> tasks = entityManager.createQuery(jpql, AppTask.class)
                                .setParameter("trackerId", trackerId)
                                .getResultList();

                return tasks.stream()
                                .map(task -> new AppTaskDTO(
                                                task.getId(),
                                                task.getTitle(),
                                                task.getDescription(),
                                                task.getStatus(),
                                                task.getPosition(),
                                                task.getTracker().getId()))
                                .toList();
        }

        public AppTaskDTO createTask(String title, String description, String status, Integer position, UUID trackerId,
                        UUID userId) {
                // Fetch tracker
                AppTracker tracker = appTrackerRepository.findById(trackerId)
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "Tracker not found with ID: " + trackerId));

                // Fetch user
                AppUser user = appUserRepository.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

                // Build and save task
                AppTask task = AppTask.builder()
                                .title(title)
                                .description(description)
                                .status(status)
                                .position(position)
                                .tracker(tracker)
                                .createdBy(user)
                                .build();

                AppTask saved = appTaskRepository.save(task);

                // Map to DTO
                AppTaskDTO dto = AppTaskDTO.builder()
                                .id(saved.getId())
                                .title(saved.getTitle())
                                .description(saved.getDescription())
                                .status(saved.getStatus())
                                .position(saved.getPosition())
                                .trackerId(tracker.getId())
                                .build();

                // Notify via WebSocket
                messagingTemplate.convertAndSend("/topic/tracker", dto);

                return dto;
        }

        public AppTaskDTO updateTask(UUID id, AppTaskDTO dto) {
                AppTask existing = appTaskRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                AppTracker tracker = appTrackerRepository.findById(dto.getTrackerId())
                                .orElseThrow(() -> new RuntimeException("Tracker not found"));

                existing.setTitle(dto.getTitle());
                existing.setDescription(dto.getDescription());
                existing.setStatus(dto.getStatus());
                existing.setPosition(dto.getPosition());
                existing.setTracker(tracker);

                AppTask saved = appTaskRepository.save(existing);

                AppTaskDTO responseDto = AppTaskDTO.builder()
                                .id(saved.getId())
                                .title(saved.getTitle())
                                .description(saved.getDescription())
                                .status(saved.getStatus())
                                .position(saved.getPosition())
                                .trackerId(tracker.getId())
                                .build();

                messagingTemplate.convertAndSend("/topic/tracker/" + tracker.getId() + "/tasks", responseDto);

                return responseDto;
        }

        public void deleteTask(UUID id) {
                appTaskRepository.deleteById(id);
                messagingTemplate.convertAndSend("/topics/task/delete", id);
        }
}
