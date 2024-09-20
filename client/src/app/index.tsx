import { View } from "react-native";
import React, { useEffect, useState } from "react";
import "expo-router/entry";
import { Link } from "expo-router";
import BoldText from "../components/text/BoldText";
import { ICompletedWorkout } from "../types";
import workoutLogApi from "../api/workoutLogApi";
import LightText from "../components/text/LightText";
import RegularText from "../components/text/RegularText";

const HomeScreen = () => {
	const [recentWorkouts, setRecentWorkouts] = useState<ICompletedWorkout[]>([]);

	useEffect(() => {
		const fetchRecentWorkouts = async () => {
			const workouts = await workoutLogApi.getCompletedWorkouts();
			setRecentWorkouts(workouts.slice(0, 3));
		};
		fetchRecentWorkouts();
	}, []);

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText>Welcome</BoldText>
			<View className="flex-row justify-between items-center">
				<BoldText>Recent workouts</BoldText>
				<Link href="/completed_workouts">
					<LightText>Show all</LightText>
				</Link>
			</View>
			{/* Show the 3 recent workouts */}
			{recentWorkouts.map(workout => (
				<View
					key={workout.id}
					className="flex-row justify-between items-center"
				>
					<RegularText>{workout.workout.name}</RegularText>
					<LightText>{workout.completedAt}</LightText>
				</View>
			))}
		</View>
	);
};

export default HomeScreen;
