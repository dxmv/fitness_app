import { View } from "react-native";
import React, { useEffect, useState } from "react";
import "expo-router/entry";
import { Link } from "expo-router";
import BoldText from "../components/text/BoldText";
import { ICompletedWorkout } from "../types";
import workoutLogApi from "../api/workoutLogApi";
import LightText from "../components/text/LightText";
import RegularText from "../components/text/RegularText";
import { LinearGradientWrapper } from "../components/wrappers/LinearGradientWrapper";

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
		<LinearGradientWrapper>
			<BoldText className="text-2xl text-white mb-4">
				Welcome, username
			</BoldText>
			{/* Workout for today (from the active routine) */}

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
		</LinearGradientWrapper>
	);
};

export default HomeScreen;
