package org.example.server.services.routine;

import org.example.server.exceptions.http.BadRequestException;
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
                .orElseThrow(() -> new RuntimeException("RoutineWorkout not found"));
    }

    /**
     * Adds a workout to a routine
     *
     * @param routineId      ID of the routine we want to add to
     * @param workoutId      ID of the workout we want to add
     * @param day            Day of the week to be changed
     * @return The updated routine.
     * @throws BadRequestException if the day of week isn't valid
     */
    @Transactional
    public Routine addWorkoutToRoutine(Long routineId, Long workoutId, DayOfWeek day) {
        Routine routine = routineService.getRoutineById(routineId);
        Workout workout = workoutService.getWorkoutById(workoutId);

        List<RoutineWorkout> weeklySchedule = routine.getWeeklySchedule();

        // Get the index based on the day of week (assuming the list is ordered from Monday to Sunday)
        int dayIndex = day.getValue() - 1;  // DayOfWeek.getValue() returns 1 for Monday, 7 for Sunday
        if (dayIndex < 0 || dayIndex >= weeklySchedule.size()) {
            throw new BadRequestException("Invalid day index: " + dayIndex);
        }

        RoutineWorkout routineWorkout = weeklySchedule.get(dayIndex);
        routineWorkout.setWorkout(workout);
        return routine;
    }



    /**
     * Remove workout from routine
     *
     * @param id                    The ID of the routine to update.
     * @param day                   The day of the week to update.
     * @return The updated routine.
     * @throws BadRequestException if the day of week isn't valid
     */
    @Transactional
    public Routine removeWorkoutFromRoutine(Long id,DayOfWeek day) {
        Routine routine = routineService.getRoutineById(id);

        List<RoutineWorkout> weeklySchedule = routine.getWeeklySchedule();
        // Get the index based on the day of week (assuming the list is ordered from Monday to Sunday)
        int dayIndex = day.getValue() - 1;  // DayOfWeek.getValue() returns 1 for Monday, 7 for Sunday
        if (dayIndex < 0 || dayIndex >= weeklySchedule.size()) {
            throw new BadRequestException("Invalid day index: " + dayIndex);
        }
        RoutineWorkout routineWorkout = weeklySchedule.get(dayIndex);
        if (routineWorkout != null && routineWorkout.getWorkout() != null) {
            routineWorkout.setWorkout(null);
            routineWorkoutRepository.save(routineWorkout);

            // Update the routine's weekly schedule
            weeklySchedule.set(dayIndex, routineWorkout);
            routine.setWeeklySchedule(weeklySchedule);

            return routineRepository.save(routine);
        }
        // If there's no workout to remove, just return the unchanged routine
        return routine;
    }
}
