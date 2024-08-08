package org.example.server.controllers;

import org.example.server.models.ExerciseSet;
import org.example.server.models.WorkoutExercise;
import org.example.server.services.WorkoutExerciseService;
import org.example.server.services.WorkoutService;
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

//    /**
//     * Update an existing workout exercise.
//     * @param workoutId The ID of the workout.
//     * @param exerciseId The ID of the workout exercise to update.
//     * @param workoutExercise The updated workout exercise details.
//     * @return The updated workout exercise.
//     */
//    @PutMapping("/{exerciseId}")
//    public ResponseEntity<WorkoutExercise> updateWorkoutExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId, @RequestBody WorkoutExercise workoutExercise) {
//        return new ResponseEntity<>(workoutExerciseService.updateWorkoutExercise(exerciseId, workoutExercise, workoutId), HttpStatus.OK);
//    }

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

    /**
     * Get all sets for a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @return A list of sets for the workout exercise.
     */
    @GetMapping("/{workoutExerciseId}/sets")
    public ResponseEntity<List<ExerciseSet>> getAllSetsForWorkoutExercise(@PathVariable Long workoutExerciseId) {
        return new ResponseEntity<>(workoutExerciseService.getAllSetsForWorkoutExercise(workoutExerciseId), HttpStatus.OK);
    }

    /**
     * Get a specific set by its index.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set.
     * @return The set at the specified index.
     */
    @GetMapping("/{workoutExerciseId}/sets/{index}")
    public ResponseEntity<ExerciseSet> getSetByIndex(@PathVariable Long workoutExerciseId, @PathVariable int index) {
        return new ResponseEntity<>(workoutExerciseService.getSetByIndex(workoutExerciseId, index), HttpStatus.OK);
    }

    /**
     * Add a new set to a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param set The Set object to add.
     * @return The updated WorkoutExercise object.
     */
    @PostMapping("/{workoutExerciseId}/sets")
    public ResponseEntity<WorkoutExercise> addSet(@PathVariable Long workoutExerciseId, @RequestBody ExerciseSet set) {
        return new ResponseEntity<>(workoutExerciseService.addSet(workoutExerciseId, set), HttpStatus.CREATED);
    }

    /**
     * Update an existing set in a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set to update.
     * @param updatedSet The updated Set object.
     * @return The updated Set object.
     */
    @PutMapping("/{workoutExerciseId}/sets/{index}")
    public ResponseEntity<ExerciseSet> updateSet(@PathVariable Long workoutExerciseId, @PathVariable int index, @RequestBody ExerciseSet updatedSet) {
        return new ResponseEntity<>(workoutExerciseService.updateSet(workoutExerciseId, index, updatedSet), HttpStatus.OK);
    }

    /**
     * Delete a set from a workout exercise.
     *
     * @param workoutExerciseId The ID of the workout exercise.
     * @param index The index of the set to delete.
     * @return HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{workoutExerciseId}/sets/{index}")
    public ResponseEntity<Void> deleteSet(@PathVariable Long workoutExerciseId, @PathVariable int index) {
        workoutExerciseService.deleteSet(workoutExerciseId, index);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
