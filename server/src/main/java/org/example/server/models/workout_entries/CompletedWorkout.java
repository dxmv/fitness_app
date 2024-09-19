package org.example.server.models.workout_entries;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.example.server.models.User;
import org.example.server.models.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents a completed workout session by a user.
 * This class tracks the actual execution of a workout, including start and end times.
 */
@Entity
@Data
@Table(name = "completed_workouts")
public class CompletedWorkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who completed this workout
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    // The original workout template that was completed
    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @Column(nullable = false)
    private LocalDateTime completedAt;


    private String notes;

    // Exercises completed as part of this workout
    @OneToMany(mappedBy = "completedWorkout", cascade = CascadeType.ALL)
    private List<CompletedExercise> completedExercises;
}
