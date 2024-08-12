package org.example.server.services;

import org.aspectj.weaver.ast.Not;
import org.example.server.exceptions.http.NotFoundException;
import org.example.server.models.Roles;
import org.example.server.models.User;
import org.example.server.repositories.UserRepository;
import org.example.server.utils.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageService imageService;

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
        return userRepository.findById(id).orElseThrow(()->new NotFoundException("The user with id: " + id + ", doesn't exist"));
    }

    /**
     * Retrieves the currently authenticated user.
     *
     * @return The current User entity, or null if no user is authenticated.
     * @throws RuntimeException if the user is found in the security context but not in the database.
     */
    public User getCurrentUser() {
        // Get the Authentication object from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if there's an authenticated user
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        // Get the principal (user details) from the Authentication object
        Object principal = authentication.getPrincipal();

        // Check if the principal is an instance of UserDetails
        // Cast the principal to UserDetails
        if (principal instanceof UserDetails userDetails) {
            // Get the username from UserDetails
            Long userId = Long.valueOf(userDetails.getUsername());

            // Find and return the User entity from the database
            return getUserById(userId);
        }

        // If the principal is not UserDetails (shouldn't happen with proper configuration)
        return null;
    }


    /**
     * Create a new user.
     * @param user The user to create.
     * @return The created user.
     */
    public User createUser(User user, MultipartFile image) {
        user.getRoles().add(Roles.ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProfilePicture(imageService.uploadImage("profile_pictures/",image));

        return userRepository.save(user);
    }

    /**
     * Update the current user.
     * @param username New username
     * @param email New email
     * @param profilePicture New profile picture
     * @return The updated user, or null if the user with the given ID does not exist.
     */
    public User updateCurrentUser(String username, String email, MultipartFile profilePicture) {
        User currentUser = getCurrentUser();

        // Only update allowed fields
        currentUser.setEmail(email);
        currentUser.setUsername(username);
        currentUser.setProfilePicture(imageService.uploadImage("profile_pictures/",profilePicture));

        return userRepository.save(currentUser);
    }

    /**
     * Delete the current user
     */
    public void deleteCurrentUser() {
        User currentUser = getCurrentUser();
        userRepository.deleteById(currentUser.getId());
    }
}
