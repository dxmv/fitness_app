package org.example.server.models.workout_entries;

import jakarta.persistence.*;
import lombok.Data;
import org.example.server.models.Exercise;

import java.util.List;

/**
 * Represents a completed exercise as part of a completed workout.
 * This class tracks the actual execution of an exercise within a workout session.
 */
@Entity
@Data
@Table(name = "completed_exercises")
public class CompletedExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The completed workout this exercise belongs to
    @ManyToOne
    @JoinColumn(name = "completed_workout_id", nullable = false)
    private CompletedWorkout completedWorkout;

    // The original exercise that was completed
    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    // The order in which this exercise was performed in the workout
    @Column(nullable = false)
    private Integer orderInWorkout;

    // Individual set logs for this completed exercise
    @OneToMany(mappedBy = "completedExercise", cascade = CascadeType.ALL)
    private List<ExerciseSetLog> exerciseSetLogs;
}
