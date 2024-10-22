package org.example.server.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.server.dto.DeleteResponse;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.models.Exercise;
import org.example.server.models.MuscleGroup;
import org.example.server.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        Exercise toDelete = getExerciseById(id); // to check if the exercise exists
        exerciseRepository.deleteById(id);
        return new DeleteResponse("Successfully deleted the exercise with id: " + id);
    }

    /**
     * Adds all exercises from the file
     *
     * @return List of added exercises
     */
    public List<Exercise> addAll() {
        List<Exercise> exercises = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        try {
            // Read JSON file from resources
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("exercises.json");
            if (inputStream == null) {
                throw new RuntimeException("Could not find exercises.json");
            }

            // Parse JSON into a List of Maps
            List<Map<String, Object>> exerciseDataList = mapper.readValue(
                    inputStream,
                    new TypeReference<List<Map<String, Object>>>() {}
            );

            // Convert each JSON object to Exercise entity
            for (Map<String, Object> exerciseData : exerciseDataList) {
                Exercise exercise = new Exercise();

                // Set basic fields
                exercise.setName((String) exerciseData.get("name"));
                exercise.setDescription((String) exerciseData.get("description"));
                exercise.setGifUrl((String) exerciseData.get("gifUrl"));

                // Convert muscle groups to enum
                @SuppressWarnings("unchecked")
                List<String> muscleGroupStrings = (List<String>) exerciseData.get("muscleGroups");
                List<MuscleGroup> muscleGroups = muscleGroupStrings.stream()
                        .map(mg -> MuscleGroup.valueOf(mg.toUpperCase()))
                        .collect(Collectors.toList());
                exercise.setMuscleGroups(muscleGroups);

                // Extract video URLs from videos array
                @SuppressWarnings("unchecked")
                List<Map<String, String>> videos = (List<Map<String, String>>) exerciseData.get("videos");
                List<String> videoUrls = videos.stream()
                        .map(video -> video.get("id"))
                        .collect(Collectors.toList());
                exercise.setVideoUrls(videoUrls);

                exercises.add(exercise);
                exerciseRepository.save(exercise); // save the exercise
            }

            return exercises;
        } catch (Exception e) {
            throw new RuntimeException("Error reading exercises file: " + e.getMessage(), e);
        }
    }

    /**
     * Clear all exercises
     */
    public void deleteAll() {
        exerciseRepository.deleteAll();
    }
}
