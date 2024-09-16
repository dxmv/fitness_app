package org.example.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.example.server.models.routine.Routine;
import org.example.server.models.workout.Workout;
import org.example.server.models.workout_entries.CompletedWorkout;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String username;

    private String profilePicture;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Workout> workouts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Routine> routines;

    @OneToOne
    private Routine activeRoutine;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User_Roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Set<Roles> roles = new HashSet<>();

    // Bidirectional relationship with CompletedWorkout
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CompletedWorkout> completedWorkouts;

}
