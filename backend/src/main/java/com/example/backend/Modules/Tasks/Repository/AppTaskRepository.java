package com.example.backend.Modules.Tasks.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.Modules.Tasks.Entity.AppTask;

@Repository
public interface AppTaskRepository extends JpaRepository<AppTask, UUID> {

    @Query("SELECT t FROM AppTask t WHERE t.tracker.id = :trackerId ORDER BY t.status ASC, t.position ASC")
    List<AppTask> findAllTasksByTrackerId(@Param("trackerId") UUID trackerId);

}
