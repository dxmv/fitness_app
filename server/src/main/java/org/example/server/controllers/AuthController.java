package org.example.server.controllers;

import lombok.Getter;
import lombok.Setter;
import org.example.server.models.User;
import org.example.server.services.AuthService;
import org.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * UserController handles the REST API requests for User operations.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    /**
     * Endpoint for user login.
     *
     * @param authenticationRequest Contains the user ID and password for authentication.
     * @return A ResponseEntity containing the JWT token if authentication is successful.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest authenticationRequest) {
        return new ResponseEntity<>(new AuthenticationResponse(authService.loginUser(authenticationRequest.getUsername(), authenticationRequest.getPassword())), HttpStatus.CREATED); // Return the generated JWT token
    }

    /**
     * Register a new user.
     * @param user The user to register.
     * @return The registered user.
     */
    /**
     * Create a new user with a profile picture.
     *
     * @param user           The user data.
     * @param image The profile picture file.
     * @return The created user.
     */
    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> createUser(
            @ModelAttribute User user,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        {
            System.out.println(image);
            return new ResponseEntity<>(userService.createUser(user, image), HttpStatus.CREATED);
        }
    }

    @Getter
    class AuthenticationResponse {

        private final String jwt; // JWT token

        // Constructor to initialize JWT token
        public AuthenticationResponse(String jwt) {
            this.jwt = jwt;
        }

    }

    @Getter
    @Setter
    static
    class AuthenticationRequest {

        private String username;
        private String password;

        // Default constructor for JSON parsing
        public AuthenticationRequest() {
        }

        // Constructor to initialize user ID and password
        public AuthenticationRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }
}


