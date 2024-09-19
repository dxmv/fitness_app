package org.example.server.services;

import org.example.server.dto.CompletedWorkoutDTO;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.exceptions.http.UnauthorizedException;
import org.example.server.models.Exercise;
import org.example.server.models.User;
import org.example.server.models.workout.Workout;
import org.example.server.models.workout_entries.CompletedExercise;
import org.example.server.models.workout_entries.CompletedWorkout;
import org.example.server.models.workout_entries.ExerciseSetLog;
import org.example.server.repositories.CompletedWorkoutRepository;
import org.example.server.services.workout.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class CompletedWorkoutService {
    @Autowired
    private CompletedWorkoutRepository completedWorkoutRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private ExerciseService exerciseService;

    /**
     * Checks if the completed workout belongs to the currently authenticated user.
     * 
     * @param cw The completed workout to check.
     * @return true if the completed workout belongs to the user, false otherwise.
     */
    private boolean belongsToUser(CompletedWorkout cw){
        User u = userService.getCurrentUser();
        return cw.getUser().getId().equals(u.getId());
    }

    /**
     * Retrieves all completed workouts for the currently authenticated user.
     * 
     * @return A list of completed workouts for the user.
     */
    public List<CompletedWorkout> getAllCompletedWorkoutsForUser(){
        User u = userService.getCurrentUser();
        return u.getCompletedWorkouts();
    }

    /**
     * Retrieves a completed workout by its ID.
     * 
     * @param id The ID of the completed workout.
     * @return The completed workout if found and belongs to the user.
     * @throws NotFoundException if no completed workout is found with the given ID.
     * @throws UnauthorizedException if the completed workout does not belong to the user.
     */
    public CompletedWorkout getById(long id) {
        Optional<CompletedWorkout> cw = completedWorkoutRepository.findById(id);
        if(cw.isEmpty()){
            throw new NotFoundException("No completed workout with id: " + id);
        }
        if(!belongsToUser(cw.get())){
            throw new UnauthorizedException("You don't have access to completed workout with id: " + id);
        }
        return cw.get();
    }

    /**
     * Creates a new completed workout based on the provided DTO.
     * 
     * @param dto The DTO containing completed workout information.
     * @return The newly created and saved CompletedWorkout entity.
     */
    public CompletedWorkout create(CompletedWorkoutDTO dto) {
        User currentUser = userService.getCurrentUser();
        Workout workout = workoutService.getWorkoutById(dto.getWorkoutId());

        CompletedWorkout completedWorkout = new CompletedWorkout();
        completedWorkout.setUser(currentUser);
        completedWorkout.setWorkout(workout);
        completedWorkout.setCompletedAt(LocalDateTime.now()); // Set the current date

        List<CompletedExercise> completedExercises = new ArrayList<>();

        for (CompletedWorkoutDTO.ExerciseDTO exerciseDTO : dto.getExercises()) {
            CompletedExercise completedExercise = createCompletedExercise(exerciseDTO, completedWorkout);
            completedExercises.add(completedExercise);
        }

        completedWorkout.setCompletedExercises(completedExercises);

        return completedWorkoutRepository.save(completedWorkout);
    }

    /**
     * Creates a CompletedExercise entity from the provided DTO.
     * 
     * @param exerciseDTO The DTO containing exercise information.
     * @param completedWorkout The parent CompletedWorkout entity.
     * @return A new CompletedExercise entity.
     */
    private CompletedExercise createCompletedExercise(CompletedWorkoutDTO.ExerciseDTO exerciseDTO, CompletedWorkout completedWorkout) {
        Exercise exercise = exerciseService.getExerciseById(exerciseDTO.getExerciseId());
        
        CompletedExercise completedExercise = new CompletedExercise();
        completedExercise.setExercise(exercise);
        completedExercise.setCompletedWorkout(completedWorkout);
        completedExercise.setOrderInWorkout(exerciseDTO.getOrderInWorkout());

        List<ExerciseSetLog> setLogs = new ArrayList<>();

        for (CompletedWorkoutDTO.ExerciseDTO.SetDTO setDTO : exerciseDTO.getSets()) {
            ExerciseSetLog setLog = createExerciseSetLog(setDTO, completedExercise);
            setLogs.add(setLog);
        }

        completedExercise.setExerciseSetLogs(setLogs);

        return completedExercise;
    }

    /**
     * Creates an ExerciseSetLog entity from the provided DTO.
     * 
     * @param setDTO The DTO containing set information.
     * @param completedExercise The parent CompletedExercise entity.
     * @return A new ExerciseSetLog entity.
     */
    private ExerciseSetLog createExerciseSetLog(CompletedWorkoutDTO.ExerciseDTO.SetDTO setDTO, CompletedExercise completedExercise) {
        ExerciseSetLog setLog = new ExerciseSetLog();
        setLog.setCompletedExercise(completedExercise);
        setLog.setReps(setDTO.getReps());
        setLog.setWeight(setDTO.getWeight());
        return setLog;
    }

    /**
     * Deletes a completed workout by its ID.
     * 
     * @param id The ID of the completed workout to delete.
     * @throws NotFoundException if no completed workout is found with the given ID.
     * @throws UnauthorizedException if the completed workout does not belong to the user.
     */
    public void deleteById(long id) {
        Optional<CompletedWorkout> cw = completedWorkoutRepository.findById(id);
        if(cw.isEmpty()){
            throw new NotFoundException("No completed workout with id: " + id);
        }
        if(!belongsToUser(cw.get())){
            throw new UnauthorizedException("You don't have access to completed workout with id: " + id);
        }
        completedWorkoutRepository.deleteById(id);
    }

    /**
     * Deletes all completed workouts for the currently authenticated user.
     */
    public void deleteAll() {
        User currentUser = userService.getCurrentUser();
        List<CompletedWorkout> completedWorkouts = currentUser.getCompletedWorkouts();
        completedWorkoutRepository.deleteAll(completedWorkouts);
    }
}
