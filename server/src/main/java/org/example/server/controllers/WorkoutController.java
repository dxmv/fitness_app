package org.example.server.controllers;

import org.example.server.models.workout.Workout;
import org.example.server.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * WorkoutController handles the REST API requests for Workout operations.
 */
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    /**
     * Get all workouts.
     * @return A list of workouts.
     */
    @GetMapping
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return new ResponseEntity<>(workoutService.getAllWorkoutsForUser(), HttpStatus.OK);
    }

    /**
     * Get a workout by ID.
     * @param id The ID of the workout.
     * @return The workout with the given ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id) {
        return new ResponseEntity<>(workoutService.getWorkoutById(id), HttpStatus.OK);
    }

    /**
     * Create a new workout.
     * @param workout The workout to create.
     * @return The created workout.
     */
    @PostMapping
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) {
        return new ResponseEntity<>(workoutService.createWorkout(workout), HttpStatus.CREATED);
    }

    /**
     * Update an existing workout.
     * @param id The ID of the workout to update.
     * @param workout The updated workout details.
     * @return The updated workout.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        return new ResponseEntity<>(workoutService.updateWorkout(id, workout), HttpStatus.OK);
    }

    /**
     * Delete a workout by ID.
     * @param id The ID of the workout to delete.
     * @return HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
