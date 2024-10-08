- [ ] Redesign the database

  - [x] Active routine
  - [x] Routines created
  - [x] Workout entries
  - [x] Delete exercise sets
  - [ ] Add the new fields

- [ ] Routine:

  - [x] Initialize routine with the days of the week
  - [x] Fix add routine workout
  - [ ] Remove routine workout
  - [x] Route to make the routine active/de-active
  - [ ] Field that tracks if the routine is active (boolean)

- [x] Completed workout:

  - [x] Get all for user
  - [x] Get single
  - [x] Add
  - [x] Json back reference
  - [x] Delete
  - [x] Clear
  - [x] Date field

- [ ] Preserve the order when updating routine workouts

- [x] Delete Response

- [ ] Default pfp for user

- [ ] Script to add exercises to the database

- [ ] Generic method to check if the element belongs to the user

- [ ] Optimize gets

- [ ] Cleaner code & better file structure

- [ ] Compress the images

- [ ] Forgot password

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

- [x] Create endpoints for logging completed workouts
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
