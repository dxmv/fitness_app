package org.example.server.services;

import org.example.server.exceptions.http.BadRequestException;
import org.example.server.models.Exercise;
import org.example.server.models.ExerciseSet;
import org.example.server.models.Workout;
import org.example.server.models.WorkoutExercise;
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

//    /**
//     * Updates an existing workout exercise with new details.
//     *
//     * @param exerciseId The ID of the workout exercise to update.
//     * @param workoutExercise The updated WorkoutExercise details.
//     * @param workoutId The ID of the workout to which the exercise belongs.
//     * @return The updated WorkoutExercise object.
//     * @throws RuntimeException if the exercise or workout is not found or does not match.
//     */
//    public WorkoutExercise updateWorkoutExercise(Long exerciseId, WorkoutExercise workoutExercise, Long workoutId) {
//        // Verify the existence of the exercise and ensure it matches the provided workout
//
//        return new WorkoutExercise();
//    }

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

    /**
     * Retrieves all sets for a specific workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @return A list of sets associated with the workout exercise.
     */
    public List<ExerciseSet> getAllSetsForWorkoutExercise(Long workoutExerciseId) {
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        return workoutExercise.getSets();
    }

    /**
     * Retrieves a specific set by its index within the workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set in the list.
     * @return The Set object at the specified index.
     */
    public ExerciseSet getSetByIndex(Long workoutExerciseId, int index) {
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        List<ExerciseSet> sets = workoutExercise.getSets();
        if (index < 0 || index >= sets.size()) {
            throw new BadRequestException("Set with index: " + index + ", not found");
        }
        return sets.get(index);
    }

    /**
     * Adds a new set to a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param set The Set object to add.
     * @return The updated WorkoutExercise object.
     */
    public WorkoutExercise addSet(Long workoutExerciseId, ExerciseSet set) {
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        workoutExercise.getSets().add(set);
        return workoutExerciseRepository.save(workoutExercise);
    }

    /**
     * Updates an existing set within a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set in the list.
     * @param updatedSet The Set object with updated details.
     * @return The updated Set object.
     */
    public ExerciseSet updateSet(Long workoutExerciseId, int index, ExerciseSet updatedSet) {
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        List<ExerciseSet> sets = workoutExercise.getSets();
        if (index < 0 || index >= sets.size()) {
            throw new BadRequestException("Set with index: " + index + ", not found");
        }
        sets.set(index, updatedSet);
        workoutExerciseRepository.save(workoutExercise);
        return updatedSet;
    }

    /**
     * Deletes a set from a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set to delete in the list.
     */
    public void deleteSet(Long workoutExerciseId, int index) {
        WorkoutExercise workoutExercise = getWorkoutExerciseById(workoutExerciseId);
        List<ExerciseSet> sets = workoutExercise.getSets();
        if (index < 0 || index >= sets.size()) {
            throw new BadRequestException("Set with index: " + index + ", not found");
        }
        sets.remove(index);
        workoutExerciseRepository.save(workoutExercise);
    }
}
