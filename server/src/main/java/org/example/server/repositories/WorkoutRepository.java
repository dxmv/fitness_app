package org.example.server.repositories;

import org.example.server.models.Routine;
import org.example.server.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout,Long> {
    List<Workout> findByUserId(Long id);
}
