import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ICompletedWorkout } from "../../../types";

export const CompletedWorkoutItem = ({
	workout,
}: {
	workout: ICompletedWorkout;
}) => {
	return (
		<TouchableOpacity className="bg-light-gray rounded-lg p-4 mb-4 shadow-md">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="text-lg font-bold text-secondary-purple">
					{workout.workout.name}
				</Text>
				<Text className="text-sm text-dark-purple">{workout.completedAt}</Text>
			</View>
			<View className="bg-light-purple rounded p-2">
				<Text className="text-dark-black mb-1">
					Exercises: {workout.completedExercises.length}
				</Text>
				{workout.completedExercises.slice(0, 3).map((exercise, index) => (
					<Text key={index} className="text-dark-purple text-sm">
						• {exercise.exercise.name}
					</Text>
				))}
				{workout.completedExercises.length > 3 && (
					<Text className="text-primary-pink text-sm mt-1">
						+{workout.completedExercises.length - 3} more
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default CompletedWorkoutItem;
