package org.example.server.repositories;

import org.example.server.models.routine.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine,Long> {
    List<Routine> findByUserId(Long id);
}
