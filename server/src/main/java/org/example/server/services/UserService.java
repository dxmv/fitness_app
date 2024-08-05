package org.example.server.services;

import org.example.server.models.User;
import org.example.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Get all users.
     * @return A list of all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get a user by ID.
     * @param id The ID of the user.
     * @return The user with the given ID, or null if not found.
     */
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()->new RuntimeException("User doesn't exits"));
    }

    /**
     * Create a new user.
     * @param user The user to create.
     * @return The created user.
     */
    public User createUser(User user) {
        // You can add additional logic here, such as password encryption
        return userRepository.save(user);
    }

    /**
     * Update an existing user.
     * @param id The ID of the user to update.
     * @param user The updated user details.
     * @return The updated user, or null if the user with the given ID does not exist.
     */
    public User updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    /**
     * Delete a user by ID.
     * @param id The ID of the user to delete.
     * @return True if the user was deleted, false otherwise.
     */
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
