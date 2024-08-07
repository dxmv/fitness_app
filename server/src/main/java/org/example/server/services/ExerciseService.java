package org.example.server.services;

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
        return exerciseRepository.findById(id).orElseThrow(() -> new RuntimeException("Exercise doesn't exist"));
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
        if (exerciseRepository.existsById(id)) {
            exercise.setId(id);
            return exerciseRepository.save(exercise);
        } else {
            // throw error
            return null;
        }
    }

    /**
     * Delete an exercise by ID.
     *
     * @param id The ID of the exercise to delete.
     * @return True if the exercise was deleted, false otherwise.
     */
    public boolean deleteExercise(Long id) {
        if (exerciseRepository.existsById(id)) {
            exerciseRepository.deleteById(id);
            return true;
        } else {
            // throw error
            return false;
        }
    }
}
