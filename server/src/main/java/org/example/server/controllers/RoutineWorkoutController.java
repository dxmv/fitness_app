package org.example.server.controllers;

import org.example.server.models.routine.Routine;
import org.example.server.models.routine.RoutineWorkout;
import org.example.server.services.routine.RoutineWorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
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
     * @param routineWorkoutId The ID of the routine workout to add to.
     * @param workoutId The ID of the workout to be added.
     * @return ResponseEntity containing the created RoutineWorkout and HTTP status.
     */
    @PutMapping("/{routineWorkoutId}/{workoutId}")
    public ResponseEntity<RoutineWorkout> addTheWorkoutToRoutine(
            @PathVariable Long routineWorkoutId,
            @PathVariable Long workoutId) {
        return new ResponseEntity<>(routineWorkoutService.addWorkoutToRoutine(routineWorkoutId, workoutId), HttpStatus.OK);
    }


    /**
     * Deletes a RoutineWorkout by its ID within a specific Routine.
     *
     * @param routineWorkoutId The ID of the Routine workout.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{routineWorkoutId}")
    public ResponseEntity<RoutineWorkout> removeWorkoutFromRoutine(@PathVariable Long routineWorkoutId) {
        return new ResponseEntity<>(routineWorkoutService.removeWorkoutFromRoutine(routineWorkoutId),HttpStatus.OK);
    }
}
