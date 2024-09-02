import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IWorkout } from "../../../types";
import { useRouter } from "expo-router";

const WorkoutItem = ({ index, item }: { index?: number; item: IWorkout }) => {
	const router = useRouter();

	const handlePress = () => {
		router.push(`/workouts/${item.id}`);
	};
	return (
		<TouchableOpacity onPress={handlePress}>
			<View>
				<Text>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default WorkoutItem;
