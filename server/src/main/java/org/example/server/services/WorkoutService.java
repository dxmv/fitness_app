package org.example.server.services;

import org.example.server.models.User;
import org.example.server.models.Workout;
import org.example.server.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserService userService; // to get the current user

    /**
     * @param workout Workout to verify
     * @return True if the creator is the current user, false otherwise
     */
    private boolean workoutBelongsToCurrentUser(Workout workout){
        User user = userService.getCurrentUser();
        return user.getId().equals(workout.getUser().getId());
    }

    /**
     * Get all workouts.
     * @return A list of all workouts.
     */
    public List<Workout> getAllWorkoutsForUser() {
        return workoutRepository.findAll();
    }

    /**
     * Get a workout by ID.
     * @param id The ID of the workout.
     * @return The workout with the given ID, or null if not found.
     */
    public Workout getWorkoutById(Long id) {
        Workout workout = workoutRepository.findById(id).orElseThrow(() -> new RuntimeException("Workout not found"));
        // don't allow the user to access a workout he didn't create
        if(!workoutBelongsToCurrentUser(workout)){
            throw new RuntimeException("You don't have access to this");
        }
        return workout;
    }

    /**
     * Create a new workout.
     * @param workout The workout to create.
     * @return The created workout.
     */
    public Workout createWorkout(Workout workout) {
        // set the creator of the workout
        User currentUser = userService.getCurrentUser();
        workout.setUser(currentUser);

        return workoutRepository.save(workout);
    }

    /**
     * Update an existing workout.
     * @param id The ID of the workout to update.
     * @param workout The updated workout details.
     * @return The updated workout, or null if the workout with the given ID does not exist.
     */
    public Workout updateWorkout(Long id, Workout workout) {
        Workout workoutDb = getWorkoutById(id);
        // don't allow the user to access a workout he didn't create
        if(!workoutBelongsToCurrentUser(workoutDb)){
            throw new RuntimeException("You don't have access to this");
        }
        // update here
        return workoutRepository.save(workoutDb);
    }

    /**
     * Delete a workout by ID.
     * @param id The ID of the workout to delete.
     * @return True if the workout was deleted, false otherwise.
     */
    public boolean deleteWorkout(Long id) {
        Workout workoutDb = getWorkoutById(id);
        // don't allow the user to access a workout he didn't create
        if(!workoutBelongsToCurrentUser(workoutDb)){
            throw new RuntimeException("You don't have access to this");
        }
        workoutRepository.delete(workoutDb);
        return true;
    }
}
