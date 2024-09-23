package org.example.server.services;

import org.example.server.dto.DeleteResponse;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.models.Exercise;
import org.example.server.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    /**
     * Get all exercises.
     *
     * @return A list of all exercises.
     */
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    /**
     * Get an exercise by ID.
     *
     * @param id The ID of the exercise.
     * @return The exercise with the given ID, or null if not found.
     */
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElseThrow(() -> new NotFoundException("Exercise with id: " + id + ", doesn't exist"));
    }

    /**
     * Create a new exercise.
     *
     * @param exercise The exercise to create.
     * @return The created exercise.
     */
    public Exercise createExercise(Exercise exercise) {
        // logic for saving the video urls
        // & a gif
        return exerciseRepository.save(exercise);
    }

    /**
     * Update an existing exercise.
     *
     * @param id       The ID of the exercise to update.
     * @param exercise The updated exercise details.
     * @return The updated exercise, or null if the exercise with the given ID does not exist.
     */
    public Exercise updateExercise(Long id, Exercise exercise) {
        Exercise toUpdate = getExerciseById(id);
        // to update here...
        return exerciseRepository.save(exercise);
    }

    /**
     * Delete an exercise by ID.
     *
     * @param id The ID of the exercise to delete.
     * @return True if the exercise was deleted, false otherwise.
     */
    public DeleteResponse deleteExercise(Long id) {
        Exercise toDelete = getExerciseById(id);
        exerciseRepository.deleteById(id);
        return new DeleteResponse("Successfully deleted the exercise with id: " + id);
    }
}
