package org.example.server.controllers;

import org.example.server.dto.DeleteResponse;
import org.example.server.models.Exercise;
import org.example.server.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ExercisesController handles the REST API requests for Exercise operations.
 */
@RestController
@RequestMapping("/api/exercises")
public class ExercisesController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExercisesController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    /**
     * Get all exercises.
     * @return A list of exercises.
     */
    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return new ResponseEntity<>(exerciseService.getAllExercises(), HttpStatus.OK);
    }

    /**
     * Get an exercise by ID.
     * @param id The ID of the exercise.
     * @return The exercise with the given ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        return new ResponseEntity<>(exerciseService.getExerciseById(id), HttpStatus.OK);
    }

    /**
     * Create a new exercise.
     * This endpoint is restricted to admins.
     * @param exercise The exercise to create.
     * @return The created exercise.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        return new ResponseEntity<>(exerciseService.createExercise(exercise), HttpStatus.CREATED);
    }

    /**
     * Adds all exercises from the file
     * This endpoint is restricted to admins.
     * @return The created exercise.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addAll")
    public ResponseEntity<List<Exercise>> addAll() {
        return new ResponseEntity<>(exerciseService.addAll(), HttpStatus.CREATED);
    }

    /**
     * Update an existing exercise.
     * This endpoint is restricted to admins.
     * @param id The ID of the exercise to update.
     * @param exercise The updated exercise details.
     * @return The updated exercise.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise) {
        return new ResponseEntity<>(exerciseService.updateExercise(id, exercise), HttpStatus.OK);
    }

    /**
     * Deletes all exercises
     * This endpoint is restricted to admins.
     * @return HTTP status indicating the result of the operation.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/all")
    public ResponseEntity<DeleteResponse> deleteAll() {
        exerciseService.deleteAll();
        return new ResponseEntity<>(new DeleteResponse("Successfully deleted all exercises"),HttpStatus.OK);
    }

    /**
     * Delete an exercise by ID.
     * This endpoint is restricted to admins.
     * @param id The ID of the exercise to delete.
     * @return HTTP status indicating the result of the operation.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteResponse> deleteExercise(@PathVariable Long id) {
        return new ResponseEntity<>(exerciseService.deleteExercise(id),HttpStatus.OK);
    }
}
