package com.example.backend.Modules.Tasks.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Modules.Tasks.Entity.Task;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findAllByOrderByStatusAscPositionAsc();
}