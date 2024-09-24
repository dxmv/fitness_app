package org.example.server.services.routine;

import org.example.server.exceptions.http.BadRequestException;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.models.routine.RoutineWorkout;
import org.example.server.models.routine.Routine;
import org.example.server.models.workout.Workout;
import org.example.server.repositories.RoutineRepository;
import org.example.server.repositories.RoutineWorkoutRepository;
import org.example.server.services.UserService;
import org.example.server.services.workout.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.List;

@Service
public class RoutineWorkoutService {

    private final RoutineWorkoutRepository routineWorkoutRepository;
    private final WorkoutService workoutService;
    private final RoutineService routineService;
    private final RoutineRepository routineRepository;

    @Autowired
    public RoutineWorkoutService(RoutineWorkoutRepository routineWorkoutRepository,
                                 WorkoutService workoutService,
                                 RoutineService routineService,
                                 RoutineRepository routineRepository) {
        this.routineWorkoutRepository = routineWorkoutRepository;
        this.workoutService = workoutService;
        this.routineService = routineService;
        this.routineRepository = routineRepository;
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
        return routineWorkoutRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Routine workout not found"));
    }

    /**
     * Adds a workout to a routine
     *
     * @param routineWorkoutId      ID of the routine workout we want to add to
     * @param workoutId      ID of the workout we want to add
     * @return The updated routine workout.
     */
    @Transactional
    public RoutineWorkout addWorkoutToRoutine(Long routineWorkoutId, Long workoutId) {
        RoutineWorkout routineWorkout = this.getRoutineWorkoutById(routineWorkoutId);
        Workout workout = workoutService.getWorkoutById(workoutId);

        routineWorkout.setWorkout(workout);
        return routineWorkoutRepository.save(routineWorkout);
    }



    /**
     * Remove workout from routine
     *
     * @param id                    The ID of the routine workout to update.
     * @return The updated routine.
     */
    @Transactional
    public RoutineWorkout removeWorkoutFromRoutine(Long id) {
        RoutineWorkout routineWorkout = this.getRoutineWorkoutById(id);

        routineWorkout.setWorkout(null);
        return routineWorkoutRepository.save(routineWorkout);
    }
}
