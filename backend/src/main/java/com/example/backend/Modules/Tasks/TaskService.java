package com.example.backend.Modules.Tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.Modules.Tasks.Entity.Task;
import com.example.backend.Modules.Tasks.Repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Task> getAllTasks() {
        return taskRepository.findAllByOrderByStatusAscPositionAsc();
    }

    public Task createTask(Task task) {
        Task saved = taskRepository.save(task);
        messagingTemplate.convertAndSend("/topics/tasks", saved);

        return saved;
    }

    public Task updateTask(UUID id, Task updatedTask) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPosition(updatedTask.getPosition());
        Task saved = taskRepository.save(task);
        messagingTemplate.convertAndSend("/topic/tasks", saved);
        return saved;
    }

    public void deleteTask(UUID id) {
        taskRepository.deleteById(id);
        messagingTemplate.convertAndSend("/topics/task/delete", id);
    }
}
