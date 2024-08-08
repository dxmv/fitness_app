package org.example.server.models;

import jakarta.persistence.*;
import lombok.Data;

@Embeddable
@Data
public class ExerciseSet {
    // The number of repetitions performed in this set
    private int repCount;

    // The weight used for this set (in kilograms or pounds, depending on user preference)
    private Double weight;
}
