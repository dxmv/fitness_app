package org.example.server.services.workout;

import org.example.server.dto.DeleteResponse;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.exceptions.http.UnauthorizedException;
import org.example.server.models.User;
import org.example.server.models.workout.Workout;
import org.example.server.repositories.WorkoutRepository;
import org.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        User u = userService.getCurrentUser();
        return workoutRepository.findByUserId(u.getId());
    }

    /**
     * Get a workout by ID.
     * @param id The ID of the workout.
     * @return The workout with the given ID, or null if not found.
     */
    public Workout getWorkoutById(Long id) {
        Workout workout = workoutRepository.findById(id).orElseThrow(()->new NotFoundException("The workout with id: " + id + ", doesn't exist"));
        // don't allow the user to access a workout he didn't create
        if(!workoutBelongsToCurrentUser(workout)){
            throw new UnauthorizedException("You don't have access to workout with id: " + id);
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
        // update here
        workoutDb.setName(workout.getName());
        return workoutRepository.save(workoutDb);
    }

    /**
     * Delete a workout by ID.
     * @param id The ID of the workout to delete.
     */
    public DeleteResponse deleteWorkout(Long id) {
        Workout workoutDb = getWorkoutById(id);

        workoutRepository.delete(workoutDb);
        return new DeleteResponse("Successfully deleted the workout with id: " + id);
    }
}
