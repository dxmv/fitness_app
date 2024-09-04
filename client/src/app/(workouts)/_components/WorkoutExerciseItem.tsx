import React, { useRef } from "react";
import {
	View,
	GestureResponderEvent,
	PanResponder,
	Animated,
} from "react-native";
import { IWorkoutExercise } from "../../../types";
import LightText from "../../../components/text/LightText";

interface WorkoutExerciseItemProps {
	workoutExercise: IWorkoutExercise;
	onDelete: (id: number) => void;
}

const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({
	workoutExercise,
	onDelete,
}) => {
	const translateX = new Animated.Value(0);

	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (
				evt: GestureResponderEvent,
				gestureState
			) => {
				return gestureState.dx > 30; // Detect right swipe
			},
			onPanResponderMove: (evt, gestureState) => {
				translateX.setValue(gestureState.dx);
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx > 100) {
					// If swiped more than 100px, trigger delete
					Animated.timing(translateX, {
						toValue: 500,
						duration: 300,
						useNativeDriver: true,
					}).start(() => {
						onDelete(workoutExercise.id);
					});
				} else {
					// Otherwise, snap back
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
			style={{ transform: [{ translateX }] }}
			{...panResponder.panHandlers}
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
