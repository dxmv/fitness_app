package org.example.server.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String gifUrl;

    @ElementCollection
    private List<String> videoUrls;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "exercise_muscle_groups", joinColumns = @JoinColumn(name = "exercise_id"))
    @Column(name = "muscle_group")
    private List<MuscleGroup> muscleGroups;
}
