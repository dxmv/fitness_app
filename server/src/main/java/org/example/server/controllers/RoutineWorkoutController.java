package org.example.server.controllers;

import org.example.server.models.routine.RoutineWorkout;
import org.example.server.services.routine.RoutineWorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines/{routineId}/workouts")
public class RoutineWorkoutController {

    private final RoutineWorkoutService routineWorkoutService;

    @Autowired
    public RoutineWorkoutController(RoutineWorkoutService routineWorkoutService) {
        this.routineWorkoutService = routineWorkoutService;
    }

    /**
     * Retrieves all RoutineWorkouts for a specific Routine.
     *
     * @param routineId The ID of the Routine.
     * @return ResponseEntity containing a list of RoutineWorkouts and HTTP status.
     */
    @GetMapping
    public ResponseEntity<List<RoutineWorkout>> getRoutineWorkoutsByRoutineId(@PathVariable Long routineId) {
        return new ResponseEntity<>(routineWorkoutService.getRoutineWorkoutsByRoutineId(routineId), HttpStatus.OK);
    }

    /**
     * Retrieves a RoutineWorkout by its ID within a specific Routine.
     *
     * @param id The ID of the RoutineWorkout to retrieve.
     * @return ResponseEntity containing the RoutineWorkout if found, or NOT_FOUND status.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RoutineWorkout> getRoutineWorkoutById(@PathVariable Long id) {
        return new ResponseEntity<>(routineWorkoutService.getRoutineWorkoutById(id), HttpStatus.OK);
    }

    /**
     * Adds a workout to a routine.
     *
     * @param routineId The ID of the routine to add to.
     * @param workoutId The ID of the workout to add.
     * @param routineWorkout The RoutineWorkout to be created.
     * @return ResponseEntity containing the created RoutineWorkout and HTTP status.
     */
    @PostMapping("/{workoutId}")
    public ResponseEntity<RoutineWorkout> createRoutineWorkout(
            @PathVariable Long routineId,
            @PathVariable Long workoutId,
            @RequestBody RoutineWorkout routineWorkout) {
        return new ResponseEntity<>(routineWorkoutService.createRoutineWorkout(routineId, workoutId, routineWorkout), HttpStatus.CREATED);
    }

    /**
     * Updates an existing RoutineWorkout within a specific Routine.
     *
     * @param routineId The ID of the Routine.
     * @param id The ID of the RoutineWorkout to update.
     * @param routineWorkout The updated RoutineWorkout data.
     * @return ResponseEntity containing the updated RoutineWorkout and HTTP status.
     */
    @PutMapping("/{id}")
    public ResponseEntity<RoutineWorkout> updateRoutineWorkout(
            @PathVariable Long routineId,
            @PathVariable Long id,
            @RequestBody RoutineWorkout routineWorkout) {
            return new ResponseEntity<>(routineWorkoutService.updateRoutineWorkout(id, routineWorkout), HttpStatus.OK);
    }

    /**
     * Deletes a RoutineWorkout by its ID within a specific Routine.
     *
     * @param routineId The ID of the Routine.
     * @param id The ID of the RoutineWorkout to delete.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoutineWorkout(@PathVariable Long routineId, @PathVariable Long id) {
            routineWorkoutService.deleteRoutineWorkout(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
