package org.example.server.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    private List<WorkoutExercise> workoutExercises;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
