package org.example.server.models.workout_entries;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Represents a log of an individual set performed for a completed exercise.
 * This class tracks the details of each set, including reps and weight.
 */
@Entity
@Data
@Table(name = "exercise_set_logs")
public class ExerciseSetLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The completed exercise this set belongs to
    @ManyToOne
    @JoinColumn(name = "completed_exercise_id", nullable = false)
    private CompletedExercise completedExercise;

    // The number of this set within the exercise

    // Number of repetitions performed
    private Integer reps;

    // Weight used for this set (in kg or lbs, depending on user preference)
    private Double weight;
}
