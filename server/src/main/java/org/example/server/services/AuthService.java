package org.example.server.services;

import org.example.server.models.User;
import org.example.server.repositories.UserRepository;
import org.example.server.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository; // Repository to access user data from the database

    @Autowired
    private PasswordEncoder passwordEncoder; // Encoder to match raw password with the encoded password

    @Autowired
    private JwtUtils jwtUtil; // Utility class for JWT token operations

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Returns a generated jwt for user
     * @param username User's username
     * @param password User's password
     * @return A ResponseEntity containing the JWT token if authentication is successful.
     */
    public String loginUser(String username, String password){
        // try to find the user
        User u = userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("No users with that username"));

        // if the user exists check does the password match
        if(!passwordEncoder.matches(password,u.getPassword())){
            throw new RuntimeException("Incorrect password");
        }
        return jwtUtil.generateToken(userDetailsService.loadUserByUsername(u.getId().toString()));
    }
}
