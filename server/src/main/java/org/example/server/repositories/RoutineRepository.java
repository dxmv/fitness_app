package org.example.server.repositories;

import org.example.server.models.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutineRepository extends JpaRepository<Routine,Long> {
}
