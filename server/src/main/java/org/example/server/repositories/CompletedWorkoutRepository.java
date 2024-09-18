package org.example.server.repositories;

import org.example.server.models.Exercise;
import org.example.server.models.workout_entries.CompletedWorkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompletedWorkoutRepository extends JpaRepository<CompletedWorkout,Long> {
}
