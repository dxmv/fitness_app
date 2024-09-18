package org.example.server.controllers;

import org.example.server.models.workout.WorkoutExercise;
import org.example.server.services.workout.WorkoutExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * WorkoutExerciseController handles the REST API requests for WorkoutExercise operations.
 */
@RestController
@RequestMapping("/api/workouts/{workoutId}/exercises")
public class WorkoutExerciseController {

    private final WorkoutExerciseService workoutExerciseService;

    @Autowired
    public WorkoutExerciseController(WorkoutExerciseService workoutExerciseService) {
        this.workoutExerciseService = workoutExerciseService;
    }

    /**
     * Get all workout exercises for a workout.
     * @param workoutId The ID of the workout.
     * @return A list of workout exercises.
     */
    @GetMapping
    public ResponseEntity<List<WorkoutExercise>> getAllWorkoutExercisesForWorkout(@PathVariable Long workoutId) {
        return new ResponseEntity<>(workoutExerciseService.getAllWorkoutExercisesByWorkoutId(workoutId), HttpStatus.OK);
    }

    /**
     * Get a workout exercise by ID.
     * @param workoutId The ID of the workout.
     * @param workoutExerciseId The ID of the workout exercise.
     * @return The workout exercise with the given ID.
     */
    @GetMapping("/{workoutExerciseId}")
    public ResponseEntity<WorkoutExercise> getWorkoutExerciseById(@PathVariable Long workoutId, @PathVariable Long workoutExerciseId) {
        return new ResponseEntity<>(workoutExerciseService.getWorkoutExerciseById(workoutExerciseId), HttpStatus.OK);
    }

    /**
     * Create a new workout exercise for a workout.
     * @param workoutId The ID of the workout.
     * @param exerciseId The ID of the exercise to add
     * @return The created workout exercise.
     */
    @PostMapping("/{exerciseId}")
    public ResponseEntity<WorkoutExercise> createWorkoutExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId) {
        return new ResponseEntity<>(workoutExerciseService.createWorkoutExercise(workoutId,exerciseId), HttpStatus.CREATED);
    }

    /**
     * Delete a workout exercise by ID.
     * @param workoutExerciseId The ID of the workout exercise to delete.
     * @return HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{workoutExerciseId}")
    public ResponseEntity<WorkoutExercise> deleteWorkoutExerciseById(@PathVariable Long workoutId, @PathVariable Long workoutExerciseId) {
        workoutExerciseService.deleteWorkoutExercise(workoutExerciseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
