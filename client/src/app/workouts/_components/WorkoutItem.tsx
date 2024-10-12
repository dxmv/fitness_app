import { View, TouchableOpacity } from "react-native";
import React from "react";
import { IWorkout } from "../../../types";
import { useRouter } from "expo-router";
import RegularText from "../../../components/text/RegularText";
import BoldText from "../../../components/text/BoldText";
import { Ionicons } from "@expo/vector-icons";

const WorkoutItem = ({ index, item }: { index?: number; item: IWorkout }) => {
	const router = useRouter();

	// Function to handle the press event
	const handlePress = () => {
		// Navigate to the workout details page
		router.push(`/workouts/details/${item.id}`);
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="bg-light-purple rounded-lg p-4 shadow-md mb-2 flex-row justify-between items-center"
		>
			<View className="flex-1">
				<BoldText className="text-dark-purple text-lg font-semibold mb-1">
					{item.name}
				</BoldText>
				<View className="flex-row items-center">
					<Ionicons name="barbell-outline" size={16} color="#7B1FA2" />
					<RegularText className="text-secondary-purple text-xs ml-1">
						{item.workoutExercises.length} exercises
					</RegularText>
				</View>
			</View>
			<View className="bg-primary-pink rounded-full w-8 h-8 flex items-center justify-center">
				<Ionicons name="chevron-forward" size={20} color="#F5F5F5" />
			</View>
		</TouchableOpacity>
	);
};

export default WorkoutItem;
