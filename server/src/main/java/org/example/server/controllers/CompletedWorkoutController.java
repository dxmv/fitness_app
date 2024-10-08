package org.example.server.controllers;

import org.example.server.dto.CompletedWorkoutDTO;
import org.example.server.dto.DeleteResponse;
import org.example.server.models.workout.Workout;
import org.example.server.models.workout_entries.CompletedWorkout;
import org.example.server.services.CompletedWorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller for handling completed workout requests
@Controller
@RequestMapping("/api/workout_log")
public class CompletedWorkoutController {
    
    // Service for managing completed workouts
    @Autowired
    private CompletedWorkoutService completedWorkoutService;

    // Endpoint to retrieve all completed workouts for the authenticated user
    @GetMapping
    public ResponseEntity<List<CompletedWorkout>> getAllCompleted() {
        // Fetching completed workouts and returning them with an OK status
        return new ResponseEntity<>(completedWorkoutService.getAllCompletedWorkoutsForUser(), HttpStatus.OK);
    }

    // Endpoint to retrieve a single completed workout by its ID
    @GetMapping("/{id}")
    public ResponseEntity<CompletedWorkout> getSingleCompleted(@PathVariable long id) {
        // Fetching the completed workout by ID and returning it with an OK status
        return new ResponseEntity<>(completedWorkoutService.getById(id), HttpStatus.OK);
    }

    // Endpoint to create a new completed workout
    @PostMapping
    public ResponseEntity<CompletedWorkout> createCompletedWorkout(@RequestBody CompletedWorkoutDTO completedWorkoutDTO) {
        // Creating a new completed workout and returning it with a CREATED status (201)
        return new ResponseEntity<>(completedWorkoutService.create(completedWorkoutDTO), HttpStatus.CREATED);
    }

    // Endpoint to delete all completed workouts for the authenticated user
    @DeleteMapping()
    public ResponseEntity<DeleteResponse> deleteAllCompletedWorkouts(){

        return new ResponseEntity<>(completedWorkoutService.deleteAll(),HttpStatus.OK);
    }

    // Endpoint to delete a completed workout by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteResponse> deleteCompletedWorkout(@PathVariable long id){
        return new ResponseEntity<>(completedWorkoutService.deleteById(id),HttpStatus.OK);
    }
}
