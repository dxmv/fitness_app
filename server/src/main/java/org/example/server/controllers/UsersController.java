package org.example.server.controllers;

import org.example.server.dto.DeleteResponse;
import org.example.server.models.User;
import org.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * UserController handles the REST API requests for User operations.
 */
@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users.
     * @return A list of users.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    /**
     * Get the current logged-in user.
     * @return A logged-in user.
     */
    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        return new ResponseEntity<>(userService.getCurrentUser(), HttpStatus.OK);
    }

    /**
     * Get a user by ID.
     * @param id The ID of the user.
     * @return The user with the given ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    /**
     * Update an existing user.
     * @param user The updated user details.
     * @return The updated user.
     */
    @PutMapping(path="/current",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> updateUser(
            @RequestPart("username") String username,
            @RequestPart("email") String email,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture ){
        return new ResponseEntity<>(userService.updateCurrentUser(username,email,profilePicture), HttpStatus.OK);
    }

    /**
     * Delete a user by ID.
     * @return HTTP status indicating the result of the operation.
     */
    @DeleteMapping("/current")
    public ResponseEntity<DeleteResponse> deleteUser() {
        return new ResponseEntity<>(userService.deleteCurrentUser(),HttpStatus.OK);
    }
}
