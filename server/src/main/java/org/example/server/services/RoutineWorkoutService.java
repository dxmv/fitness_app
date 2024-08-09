package org.example.server.services;

import org.example.server.models.RoutineWorkout;
import org.example.server.models.Routine;
import org.example.server.models.User;
import org.example.server.models.Workout;
import org.example.server.repositories.RoutineWorkoutRepository;
import org.example.server.repositories.RoutineRepository;
import org.example.server.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineWorkoutService {

    private final RoutineWorkoutRepository routineWorkoutRepository;
    private final WorkoutService workoutService;
    private final RoutineService routineService;
    private final UserService userService;

    @Autowired
    public RoutineWorkoutService(RoutineWorkoutRepository routineWorkoutRepository,
                                 WorkoutService workoutService,
                                 RoutineService routineService,
                                 UserService userService) {
        this.routineWorkoutRepository = routineWorkoutRepository;
        this.workoutService = workoutService;
        this.routineService = routineService;
        this.userService = userService;
    }

    /**
     * Verifies that rw belongs to the logged-in user
     *
     * @param rw Routine workout to verify
     * @return True/false based on the ownership of the routine workout
     */
    private boolean routineWorkoutBelongsToCurrentUser(RoutineWorkout rw) {
        User u = userService.getCurrentUser();
        return rw.getRoutine().getUser().getId().equals(u.getId());
    }

    /**
     * Retrieves all RoutineWorkouts for a specific Routine.
     *
     * @param routineId The ID of the Routine.
     * @return A list of RoutineWorkouts.
     */
    public List<RoutineWorkout> getRoutineWorkoutsByRoutineId(Long routineId) {
        Routine routine = routineService.getRoutineById(routineId);
        return routineWorkoutRepository.findByRoutineId(routine.getId());
    }

    /**
     * Retrieves a RoutineWorkout by its ID.
     *
     * @param id The ID of the RoutineWorkout to retrieve.
     * @return The RoutineWorkout if found.
     * @throws RuntimeException if the RoutineWorkout is not found.
     */
    public RoutineWorkout getRoutineWorkoutById(Long id) {
        RoutineWorkout rw = routineWorkoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoutineWorkout not found"));
        // check if it belongs to the current user
        if (routineWorkoutBelongsToCurrentUser(rw)) {
            return rw;
        }
        throw new RuntimeException("Routine workout doesn't belong to the current user");
    }

    /**
     * Adds a workout to a routine
     *
     * @param routineId      ID of the routine we want to add to
     * @param workoutId      ID of the workout we want to add
     * @param routineWorkout The RoutineWorkout to be created.
     * @return The created RoutineWorkout.
     * @throws RuntimeException if the routine or workout is not found.
     */
    public RoutineWorkout createRoutineWorkout(Long routineId, Long workoutId, RoutineWorkout routineWorkout) {
        Routine routine = routineService.getRoutineById(routineId);
        Workout workout = workoutService.getWorkoutById(workoutId);

        routineWorkout.setRoutine(routine);
        routineWorkout.setWorkout(workout);
        return routineWorkoutRepository.save(routineWorkout);
    }


    /**
     * Updates an existing RoutineWorkout.
     *
     * @param id                    The ID of the RoutineWorkout to update.
     * @param updatedRoutineWorkout The updated RoutineWorkout data.
     * @return The updated RoutineWorkout.
     * @throws RuntimeException if the RoutineWorkout is not found.
     */
    public RoutineWorkout updateRoutineWorkout(Long id, RoutineWorkout updatedRoutineWorkout) {
        RoutineWorkout rw = getRoutineWorkoutById(id);
        // check if it belongs to the current user
        if (!routineWorkoutBelongsToCurrentUser(rw)) {
            throw new RuntimeException("Routine workout doesn't belong to the current user");
        }

        rw.setDayOfWeek(updatedRoutineWorkout.getDayOfWeek());
        return routineWorkoutRepository.save(rw);
    }

    /**
     * Delete an existing routine workout.
     *
     * @param id                    The ID of the RoutineWorkout to update.
     * @throws RuntimeException if the RoutineWorkout is not found.
     */
    public void deleteRoutineWorkout(Long id) {
        RoutineWorkout rw = getRoutineWorkoutById(id);
        // check if it belongs to the current user
        if (!routineWorkoutBelongsToCurrentUser(rw)) {
            throw new RuntimeException("Routine workout doesn't belong to the current user");
        }

        routineWorkoutRepository.deleteById(id);

    }
}
