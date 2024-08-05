package org.example.server.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.DayOfWeek;
import java.util.List;

@Entity
@Data
public class Routine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "routine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoutineWorkout> weeklySchedule;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
