## Current tasks:

- [x] Implement Workout List screen

  - [x] Getting the workouts
  - [x] Create a new workout on this screen

- [ ] Implement Workout Detail screen

  - [x] Getting the workout
  - [ ] Edit workout name
  - [x] Delete the workout
  - [x] Add exercises to the workout
  - [x] Remove exercises from the workout with a swipe
  - [ ] Click on an exercise to see its details
  - [ ] Change the order of the exercises
  - [ ] Better exercise adding

- [ ] Workout functionality

  - [x] Start the workout
  - [x] Show a list of exercises
  - [x] Show the number of sets and reps for each exercise

  - [x] Show sets for each exercise
  - [x] Add the set
  - [x] Edit the set
  - [x] Remove the set
  - [x] When updating the set, start the rest timer
  - [x] When the user click on an exercise, show a screen with the exercise details

  - [x] Show the rest timer between exercises
  - [x] Start the rest timer
  - [x] Stop the rest timer
  - [x] Modify the rest timer
  - [x] Pause the rest timer
  - [x] Resume the rest timer
  - [ ] Show paused time
  - [x] Vibration when rest is over
  - [x] Show the rest timer in minutes and seconds
  - [x] Limits on rest timer
  - [x] Disable time modification when the timer is running

  - [ ] Pause the workout
  - [ ] Resume the workout
  - [x] End the workout

- [ ] End workout screen

  - [x] Show the exercises done
  - [ ] Show the total time of the workout
  - [x] Show the total weight lifted
  - [x] Show the total sets done

  - [x] Save the workout button
  - [ ] Share the workout button
  - [x] Continue button

- [ ] Cleaner code for workouts

  - [ ] Separate into files better
  - [ ] Cleaner state management
  - [ ] More comments
  - [ ] More readable

- [ ] Home screen:

  - [x] Recent activities (show the last 3 workouts & have a button to see more)
  - [ ] Weekly calendar that shows whether the user has workouts for that day
  - [ ] A weekly calendar with the workouts from the routine

- [x] Recent workouts screen:

  - [x] Fetch all workouts
  - [x] Details modal
  - [x] Delete the log in the details screen

- [ ] Routines screen:

  - [x] Display routines
  - [ ] Show the active routine
  - [x] Show other routines

  - [ ] Make routine active
  - [ ] Deactivate the routine

  - [x] Add a routine
  - [ ] Remove a routine

- [ ] Single routine screen:

  - [x] Fetch the routine

  - [x] Display the weekly calendar with the workouts
  - [ ] Re-order workouts in the calendar

  - [ ] Add a workout to the routine
  - [ ] Remove a workout from the routine
  - [ ] Re-order workouts in the routine

  - [x] Make the current routine active
  - [ ] Deactivate the routine

  - [ ] Change the routine name
  - [x] Delete the routine

- [ ] Profile screen:

  - [ ] Avatar
  - [ ] User info
  - [ ] Stats
  - [ ] Progress

- [ ] Optimizations:

  - [ ] Use a fetch wrapper for screens to fetch again
  - [ ] Use a swipe wrapper to wrap items, pass the function to execute when swiping

- [ ] Exercise screen:

  - [ ] Show the gif
  - [ ] Show 4 videos
  - [ ] Show the progression chart

- [ ] Settings

- [ ] Other:
  - [ ] Loading screen
  - [ ] Error screen
  - [ ] Offline mode
  - [ ] Wrap where needed with swipe wrapper

## Known issues:

- [x] Fetching a workout with an id above 10 doesn't work
- [x] Can't add the exercise to the workout with an id above 10
- [x] Can start workout without exercises
- [ ] When adding an exercise to a workout, add the order
- [ ] When adding an exercise to a workout, we need to restart the app to see the exercise in the list
- [ ] When deleting a workout, the workout list screen is not refreshed
- [x] No text on the workout list screen, telling the user that they have no workouts
- [ ] Login doesn't redirect to the home screen
- [ ] Can add infinite sets to the workout
- [ ] Can add sets with 0 reps
- [ ] Figure out what to do when the user updates the set
- [ ] Vibration pattern can be changed in settings
- [ ] Not using text input for routine name
- [ ] Not using text input for workout name
- [ ] When swiping delete show a confirmation modal
- [ ] Register screen does't redirect to the home screen
- [ ] Register screen doesn't show the default avatar
- [ ] Register screen doesn't hide the password input

## Alerts:

- [ ] Alert the user once rest is over
- [ ] Alert the user that they can't start the workout without exercises
- [ ] Alert the user that they can't add an exercise with 0 reps

# Frontend Development Checklist

## Project Setup

- [x] Initialize new React Native project
- [x] Install and configure Expo
- [x] Set up version control (e.g., Git)
- [x] Create project structure (folders for components, screens, etc.)
- [x] Install and set up navigation library
- [ ] Configure state management
- [x] Set up UI component library
- [ ] Install custom fonts
- [ ] Configure environment variables

## Authentication

- [ ] Design Login screen UI
- [x] Implement Login screen functionality
- [ ] Design Registration screen UI
- [x] Implement Registration screen functionality
- [x] Create JWT token storage utility
- [x] Implement token management (storage, retrieval, deletion)
- [ ] Set up protected routes
- [ ] Create auth \_layout.tsx file
- [ ] Add header image to auth screens
- [ ] Style auth screens consistently
- [ ] Implement error handling for auth processes
- [ ] Design Forgot Password screen UI
- [ ] Implement Forgot Password functionality

## Navigation

- [x] Set up Expo routing
- [x] Create main bottom navigation
- [ ] Implement navigation between all main screens
- [ ] Add navigation animations
- [ ] Handle deep linking

## User Profile

- [ ] Design User Profile screen UI
- [x] Display basic user info
- [x] Implement logout functionality
- [ ] Design user stats section
- [ ] Implement user stats display
- [ ] Create image upload component
- [ ] Implement profile image upload functionality
- [ ] Design edit profile form
- [ ] Implement edit profile functionality

## Exercise Library

- [ ] Design Exercise List screen UI
- [ ] Implement Exercise List screen
- [ ] Create Exercise Item component
- [ ] Design Exercise Detail screen UI
- [x] Implement Exercise Detail screen
- [ ] Add video player to Exercise Detail screen
- [ ] Implement search functionality for exercises
- [ ] Add filter options for exercises
- [ ] Implement exercise categorization

## Workout Management

- [ ] Design Create Workout screen UI
- [x] Implement Create Workout functionality
- [ ] Design Workout List screen UI
- [x] Implement Workout List screen
- [ ] Create Workout Item component
- [ ] Design Workout Detail screen UI
- [ ] Implement Workout Detail screen
- [ ] Add functionality to start/complete workouts
- [ ] Implement workout logging system

## Routine Generation

- [ ] Design User Preferences Input screen UI
- [ ] Implement User Preferences Input functionality
- [ ] Design Routine Display screen UI
- [ ] Implement Routine Display screen
- [ ] Create algorithm for generating routines
- [ ] Add functionality to customize generated routines
- [ ] Implement saving/sharing of generated routines

## Progress Tracking

- [ ] Design Progress Dashboard screen UI
- [ ] Implement Progress Dashboard screen
- [ ] Create reusable chart components
- [ ] Implement progress visualization (charts, graphs)
- [ ] Design Workout History screen UI
- [ ] Implement Workout History screen
- [ ] Add detailed view for individual workout sessions

## Settings and Preferences

- [ ] Design Settings screen UI
- [ ] Implement Settings screen
- [ ] Add notification preference controls
- [ ] Implement theme switching functionality
- [ ] Create language selection option
- [ ] Add about/help section

## Offline Functionality

- [ ] Implement local storage for workouts
- [ ] Add local storage for exercises
- [ ] Create data syncing mechanism
- [ ] Implement offline mode indicator
- [ ] Add functionality to queue actions when offline

## UI/UX Refinement

- [ ] Design and create custom button component
- [ ] Design and create custom input component
- [ ] Implement loading spinners/skeletons
- [ ] Create transition animations between screens
- [ ] Implement pull-to-refresh functionality
- [ ] Design and implement error messages
- [ ] Create success/confirmation messages

## Performance Optimization

- [ ] Replace ScrollView with FlatList where appropriate
- [ ] Implement image lazy loading
- [ ] Set up video preloading for exercise details
- [ ] Optimize state updates to reduce re-renders
- [ ] Implement memoization for expensive computations
- [ ] Set up performance monitoring

## Testing

- [ ] Set up testing environment
- [ ] Write unit tests for utility functions
- [ ] Create unit tests for key components
- [ ] Implement integration tests for auth flow
- [ ] Test workout creation and logging flow
- [ ] Perform cross-device testing
- [ ] Conduct usability testing sessions

## Accessibility

- [ ] Add accessibility labels to all interactive elements
- [ ] Ensure proper heading structure
- [ ] Test with screen readers (iOS and Android)
- [ ] Implement keyboard navigation support
- [ ] Ensure sufficient color contrast
- [ ] Add support for dynamic text sizes

## Localization

- [ ] Set up i18n framework
- [ ] Extract all text to language files
- [ ] Prepare translations for primary languages
- [ ] Implement language switching functionality
- [ ] Test app in all supported languages

## App Store Preparation

- [ ] Create app icon in various sizes
- [ ] Design and create splash screens
- [ ] Write compelling app store description
- [ ] Prepare keywords for app store optimization
- [ ] Create screenshots for all supported devices
- [ ] Design promotional graphics/banners

## Deployment

- [ ] Configure iOS build settings
- [ ] Configure Android build settings
- [ ] Set up CI/CD pipeline
- [ ] Create beta testing group
- [ ] Distribute beta version for testing
- [ ] Address beta tester feedback
- [ ] Prepare final production build
