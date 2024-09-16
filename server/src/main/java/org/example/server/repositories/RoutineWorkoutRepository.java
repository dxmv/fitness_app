package org.example.server.repositories;

import org.example.server.models.routine.RoutineWorkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineWorkoutRepository extends JpaRepository<RoutineWorkout,Long> {
    List<RoutineWorkout> findByRoutineId(Long id);
}
