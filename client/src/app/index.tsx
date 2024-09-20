import { View } from "react-native";
import React, { useEffect, useState } from "react";
import "expo-router/entry";
import { Link } from "expo-router";
import BoldText from "../components/text/BoldText";
import { ICompletedWorkout } from "../types";
import workoutLogApi from "../api/workoutLogApi";
import LightText from "../components/text/LightText";

const HomeScreen = () => {
	const [recentWorkouts, setRecentWorkouts] = useState<ICompletedWorkout[]>([]);

	useEffect(() => {
		const fetchRecentWorkouts = async () => {
			const workouts = await workoutLogApi.getCompletedWorkouts();
			setRecentWorkouts(workouts);
		};
		fetchRecentWorkouts();
	}, []);

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText>Welcome</BoldText>
			<View>
				<BoldText>Recent workouts</BoldText>
				<LightText>Show all</LightText>
			</View>
		</View>
	);
};

export default HomeScreen;
