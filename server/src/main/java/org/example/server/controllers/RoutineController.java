package org.example.server.controllers;

import org.example.server.models.routine.Routine;
import org.example.server.services.routine.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {

    private final RoutineService routineService;

    @Autowired
    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    /**
     * Retrieves all routines for the current user.
     *
     * @return ResponseEntity containing a list of routines and HTTP status.
     */
    @GetMapping
    public ResponseEntity<List<Routine>> getRoutinesForCurrentUser() {
        return new ResponseEntity<>(routineService.getRoutinesForCurrentUser(), HttpStatus.OK);
    }

    /**
     * Retrieves a routine by its ID for the current user.
     *
     * @param routineId The ID of the routine to retrieve.
     * @return ResponseEntity containing the routine if found, or NOT_FOUND status.
     */
    @GetMapping("/{routineId}")
    public ResponseEntity<Routine> getRoutine(@PathVariable Long routineId) {
        return new ResponseEntity<>(routineService.getRoutineById(routineId), HttpStatus.OK);
    }

    /**
     * Creates a new routine for the current user.
     *
     * @param routine The routine to be created.
     * @return ResponseEntity containing the created routine and HTTP status.
     */
    @PostMapping
    public ResponseEntity<Routine> createRoutine(@RequestBody Routine routine) {
        return new ResponseEntity<>(routineService.createRoutine(routine), HttpStatus.CREATED);
    }

    /**
     * Updates an existing routine for the current user.
     *
     * @param routineId The ID of the routine to update.
     * @param routine The updated routine data.
     * @return ResponseEntity containing the updated routine and HTTP status.
     */
    @PutMapping("/{routineId}")
    public ResponseEntity<Routine> updateRoutine(@PathVariable Long routineId, @RequestBody Routine routine) {
        return new ResponseEntity<>(routineService.updateRoutine(routineId, routine), HttpStatus.OK);
    }

    /**
     * Deletes a routine by its ID for the current user.
     *
     * @param routineId The ID of the routine to delete.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/{routineId}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable Long routineId) {
        routineService.deleteRoutine(routineId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}