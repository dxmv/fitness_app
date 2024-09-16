package org.example.server.services;

import org.example.server.models.Exercise;
import org.example.server.models.workout.Workout;
import org.example.server.models.workout.WorkoutExercise;
import org.example.server.repositories.WorkoutExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutExerciseService {

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private ExerciseService exerciseService;

    /**
     * Retrieves all workout exercises associated with a specific workout.
     *
     * @param workoutId The ID of the workout for which to retrieve exercises.
     * @return A list of WorkoutExercise objects associated with the specified workout.
     */
    public List<WorkoutExercise> getAllWorkoutExercisesByWorkoutId(Long workoutId) {
        // Fetch the workout and return its list of exercises
        return workoutService.getWorkoutById(workoutId).getWorkoutExercises();
    }

    /**
     * Retrieves a specific workout exercise by its ID
     *
     * @param workoutExerciseId The ID of the workout exercise to retrieve.
     * @return The WorkoutExercise object with the given ID, associated with the specified workout.
     * @throws RuntimeException if the exercise is not found or does not belong to the specified workout.
     */
    public WorkoutExercise getWorkoutExerciseById(Long workoutExerciseId) {
        // Fetch and return the workout exercise
        return workoutExerciseRepository.findById(workoutExerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));
    }

    /**
     * Creates a new workout exercise and associates it with a specific workout.
     * @param workoutId ID of workout where the exercise is added
     * @param exerciseId ID of exercise we want to add
     * @return The created WorkoutExercise object.
     * @throws RuntimeException if the associated workout is not found.
     */
    public WorkoutExercise createWorkoutExercise(Long workoutId, Long exerciseId) {
        // Ensure the workout & exercise exists before associating the workout exercise with it
        Workout workout = workoutService.getWorkoutById(workoutId);
        Exercise exercise = exerciseService.getExerciseById(exerciseId);

        WorkoutExercise workoutExercise = new WorkoutExercise();
        workoutExercise.setWorkout(workout);
        workoutExercise.setExercise(exercise);
        return workoutExerciseRepository.save(workoutExercise);
    }


    /**
     * Deletes a specific workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise to delete.
     * @throws RuntimeException if the exercise or workout is not found or does not match.
     */
    public void deleteWorkoutExercise(Long workoutExerciseId) {
        // Verify the existence of the exercise and ensure it matches the provided workout
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        workoutExerciseRepository.delete(workoutExercise);
    }
}
