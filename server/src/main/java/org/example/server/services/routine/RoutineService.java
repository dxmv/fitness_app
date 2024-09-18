package org.example.server.services.routine;

import org.example.server.exceptions.http.NotFoundException;
import org.example.server.exceptions.http.UnauthorizedException;
import org.example.server.models.routine.Routine;
import org.example.server.models.User;
import org.example.server.repositories.RoutineRepository;
import org.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserService userService;

    @Autowired
    public RoutineService(RoutineRepository routineRepository, UserService userService) {
        this.routineRepository = routineRepository;
        this.userService = userService;
    }

    /**
     * Checks if the routine belongs to the current user
     *
     * @return True/false based on the user's ownership of the routine
     */
    private boolean routineBelongsToUser(Routine routine){
        User u = userService.getCurrentUser();
        return routine.getUser().getId().equals(u.getId());
    }

    /**
     * Retrieves all routines for the current user
     *
     * @return A list of routines belonging to the user.
     */
    public List<Routine> getRoutinesForCurrentUser() {
        User u = userService.getCurrentUser();
        return routineRepository.findByUserId(u.getId());
    }

    /**
     * Retrieves a routine by its ID.
     *
     * @param routineId The ID of the routine to retrieve.
     * @return An Optional containing the routine if found, or empty if not found.
     */
    public Routine getRoutineById(Long routineId) {
        Routine routine = routineRepository.findById(routineId).orElseThrow(()->new NotFoundException("The routine with id: " + routineId + ", doesn't exist"));

        // return the routine only if it belongs to the user
        if (routineBelongsToUser(routine)) {
            return routine;
        }
        throw new UnauthorizedException("The routine with id: " + routineId + " doesn't belong to the user");
    }

    /**
     * Creates a new routine for a specific user.
     *
     * @param routine The routine to be created.
     * @return The created routine.
     */
    public Routine createRoutine( Routine routine) {
        User user = userService.getCurrentUser();

        routine.setUser(user);
        return routineRepository.save(routine);
    }


    /**
     * Updates an existing routine.
     *
     * @param routineId The ID of the routine to update.
     * @param updatedRoutine The updated routine data.
     * @return The updated routine.
     */
    public Routine updateRoutine(Long routineId, Routine updatedRoutine) {
        Routine existingRoutine = getRoutineById(routineId);

        existingRoutine.setName(updatedRoutine.getName());
        return routineRepository.save(existingRoutine);
    }

    /**
     * Deletes a routine by its ID.
     *
     * @param routineId The ID of the routine to delete.
     * @throws IllegalArgumentException if the routine is not found.
     */
    public void deleteRoutine(Long routineId) {
        // returns the routine only if it exists & belongs to the current user
        Routine routine = getRoutineById(routineId);

        routineRepository.delete(routine);
    }
}
