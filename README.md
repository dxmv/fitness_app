# Todo: 17.08.2024

- [x] Delete images after update, and when deleting user
- [ ] Setup React Native
- [ ] Login screen
- [ ] Register screen
- [ ] Auth calls frontend

# Frontend Development Checklist

## Project Setup

- [x] Initialize a new React Native project
- [ ] Set up navigation (e.g., React Navigation)
- [ ] Configure state management (e.g., Redux or Context API)
- [ ] Set up a UI component library (e.g., React Native Elements or NativeBase)

## Authentication Screens

- [ ] Design and implement Login screen
- [ ] Design and implement Registration screen
- [ ] Create Forgot Password screen
- [ ] Implement JWT token storage and management

## User Profile

- [ ] Create User Profile screen
- [ ] Implement profile image upload functionality
- [ ] Add form for editing user details

## Exercise Library

- [ ] Design Exercise List screen
- [ ] Create Exercise Detail screen with video player
- [ ] Implement search and filter functionality for exercises

## Workout Management

- [ ] Design Create Workout screen
- [ ] Implement Workout List screen
- [ ] Create Workout Detail screen
- [ ] Add functionality to log completed workouts

## Routine Generation

- [ ] Design screen for inputting user preferences
- [ ] Create Routine Display screen
- [ ] Implement functionality to customize generated routines

## Progress Tracking

- [ ] Design Progress Dashboard screen
- [ ] Create charts and graphs for visualizing progress
- [ ] Implement screens for viewing workout history

## Settings and Preferences

- [ ] Create Settings screen
- [ ] Implement notification preferences
- [ ] Add option to change app theme (if applicable)

## Offline Functionality

- [ ] Implement local storage for offline access to workouts and exercises
- [ ] Create sync mechanism for updating local data when online

## UI/UX Refinement

- [ ] Design and implement custom components (e.g., buttons, inputs)
- [ ] Create loading states and animations
- [ ] Implement error handling and user feedback mechanisms

## Performance Optimization

- [ ] Optimize list rendering (e.g., use FlatList for long lists)
- [ ] Implement lazy loading for images and videos
- [ ] Set up performance monitoring (e.g., with React Native Performance)

## Testing

- [ ] Write unit tests for components and utility functions
- [ ] Implement integration tests for key user flows
- [ ] Perform usability testing with potential users

## Accessibility

- [ ] Ensure proper use of accessibility labels
- [ ] Test and optimize for screen readers
- [ ] Implement keyboard navigation support

## Localization

- [ ] Set up internationalization (i18n) framework
- [ ] Prepare translations for target languages

## App Store Preparation

- [ ] Create app icons and splash screens
- [ ] Write app store descriptions and metadata
- [ ] Prepare screenshots and promotional materials

## Deployment

- [ ] Configure build settings for iOS and Android
- [ ] Set up continuous integration for automated builds
- [ ] Prepare for app store submission

# Backend Development checklist

## Initialize the Spring Boot Project

- [x] Use Spring Initializer (start.spring.io) to create a new project
- [x] Select necessary dependencies (e.g., Spring Web, Spring Data JPA, Spring Security)

## Set Up the Project Structure

- [x] Create packages for controllers, services, repositories, and models
- [x] Set up configuration files (application.properties or application.yml)

## Design and Implement Data Models

- [x] Create entity classes for User, Exercise, Workout, Routine, etc.
- [x] Define relationships between entities (e.g., @OneToMany, @ManyToMany)

## Set Up the Database

- [x] Configure the database connection in `application.properties`
- [x] Set up Hibernate properties for automatic schema generation

## Implement Repositories

- [x] Create repository interfaces for each entity

## Develop Service Layer

- [x] Create service interfaces and implementations for business logic
- [x] Implement methods for creating, reading, updating, and deleting entities

## Create REST Controllers

- [x] Implement controllers for each major feature (Users, Exercises, Workouts, Routines)
- [x] Define endpoints for CRUD operations and other functionalities

## Implement User Authentication and Authorization

- [x] Configure Spring Security for JWT-based authentication
- [x] Implement user registration and login endpoints
- [x] Set up role-based access control for endpoints
- [x] Fix the user service & others
- [x] User profile image

## Images

- [x] Images controller
- [x] Get images method
- [x] Delete images method
- [x] User profile image

## Setup videos for exercises

- [ ] Get all exercises from somewhere
- [ ] Add 4 short videos for each exercise
- [ ] Add a gif
- [ ] Add an image

## Develop Routine Generation Logic

- [ ] Create algorithms for generating routines based on user preferences
- [ ] Implement endpoints for requesting and customizing generated plans

## Implement Progress Tracking

- [ ] Create endpoints for logging completed workouts
- [ ] Develop logic for calculating and retrieving user statistics

## Set Up Scheduled Tasks

- [ ] Implement a scheduler for sending workout reminders
- [ ] Create jobs for generating periodic progress reports

## Implement Data Validation and Error Handling

- [ ] Use Bean Validation for input validation
- [ ] Create custom exception handlers for graceful error responses

## Develop API Documentation

- [ ] Integrate Swagger or SpringFox for automatic API documentation
- [ ] Add detailed descriptions to API endpoints and models

## Implement Logging

- [ ] Configure logging framework (e.g., SLF4J with Logback)
- [ ] Add appropriate log statements throughout the application

## Write Unit and Integration Tests

- [ ] Create unit tests for services and utilities
- [ ] Implement integration tests for API endpoints
- [ ] Set up test databases and configurations

## Optimize Performance

- [ ] Implement caching mechanisms (e.g., Redis) for frequently accessed data
- [ ] Optimize database queries and indexing

## Set Up Monitoring and Health Checks

- [ ] Integrate Spring Actuator for application health monitoring
- [ ] Set up logging and monitoring tools (e.g., ELK stack, Prometheus)

## Prepare for Deployment

- [ ] Configure profiles for different environments (dev, staging, production)
- [ ] Set up CI/CD pipeline (e.g., Jenkins, GitLab CI)

## Deploy the Application

- [ ] Choose a hosting platform (e.g., AWS, Google Cloud, Heroku)
- [ ] Set up necessary infrastructure (load balancers, databases)
- [ ] Deploy the application and configure environment variables

## Post-Deployment Tasks

- [ ] Monitor application performance and logs
- [ ] Set up alerts for critical errors or performance issues
- [ ] Plan for regular maintenance and updates
