package org.example.server.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExerciseSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;

    // The number of repetitions performed in this set
    @Column(nullable = false)
    private int repCount;

    // The weight used for this set (in kilograms or pounds, depending on user preference)
    private Double weight;

    // Optional field to track the order of sets
    private Integer setOrder;
}
