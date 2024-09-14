import React, { useRef } from "react";
import {
	View,
	GestureResponderEvent,
	PanResponder,
	Animated,
} from "react-native";
import { IWorkoutExercise } from "../../../types";
import LightText from "../../../components/text/LightText";

// Define the props for the WorkoutExerciseItem component
interface WorkoutExerciseItemProps {
	workoutExercise: IWorkoutExercise; // The workout exercise data
	onDelete: (id: number) => void; // Function to handle deletion of the exercise
}

// Functional component for displaying a workout exercise item
const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({
	workoutExercise,
	onDelete,
}) => {
	const translateX = new Animated.Value(0); // Animated value for swipe effect

	// Create a pan responder for swipe gestures
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (
				evt: GestureResponderEvent,
				gestureState
			) => {
				return gestureState.dx > 30; // Detect right swipe
			},
			onPanResponderMove: (evt, gestureState) => {
				translateX.setValue(gestureState.dx); // Update the animated value during swipe
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx > 100) {
					// If swiped more than 100px, trigger delete
					Animated.timing(translateX, {
						toValue: 500,
						duration: 300,
						useNativeDriver: true,
					}).start(() => {
						onDelete(workoutExercise.id); // Call the delete function
					});
				} else {
					// Otherwise, snap back to original position
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	return (
		<Animated.View
			style={{ transform: [{ translateX }] }} // Apply the animated translation
			{...panResponder.panHandlers} // Attach the pan responder handlers
		>
			<LightText>{workoutExercise.exercise.name}</LightText>
			{workoutExercise.sets.map((set, index) => (
				<View key={index}>
					<LightText>
						Set {index + 1}: {set.repCount} reps, {set.weight} kg
					</LightText>
				</View>
			))}
		</Animated.View>
	);
};

export default WorkoutExerciseItem;
