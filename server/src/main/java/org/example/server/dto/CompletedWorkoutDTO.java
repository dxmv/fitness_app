package org.example.server.dto;

import lombok.Data;

import java.util.List;

// Data Transfer Object for Completed Workouts
@Data
public class CompletedWorkoutDTO {
    private Long workoutId; 
    private List<ExerciseDTO> exercises; 

    @Data
    public static class ExerciseDTO {
        private long exerciseId;
        private List<SetDTO> sets; 
        private int orderInWorkout;
        @Data
        public static class SetDTO {
            private double weight; 
            private int reps;
        }
    }
}
