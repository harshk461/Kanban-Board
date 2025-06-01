package com.example.backend.Modules.Tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.example.backend.Common.JwtUtil;
import com.example.backend.Modules.Tasks.DTO.AppTaskDTO;
import com.example.backend.Modules.Tasks.Entity.AppTask;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
    private final TaskService taskService;
    private final JwtUtil jwtUtil;

    @GetMapping("/{trackerId}")
    public List<AppTaskDTO> getAllTasks(@PathVariable UUID trackerId) {
        return taskService.getAllTasks(trackerId);
    }

    @PostMapping("/add-task/{trackerId}")
    public AppTaskDTO createTask(@PathVariable UUID trackerId, @RequestBody AddTaskDTO task,
            HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UUID userId = jwtUtil.extractUserId(token);
        return taskService.createTask(task.name, task.description, task.status, task.position, trackerId, userId);
    }

    @PutMapping("/{id}")
    public AppTaskDTO updateTask(@PathVariable UUID id, @RequestBody AppTaskDTO task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
    }

    public static record AddTaskDTO(String name, String description, String status, Integer position) {
    }
}
