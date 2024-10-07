import { View } from "react-native";
import React, { useEffect, useState } from "react";
import "expo-router/entry";
import { Link } from "expo-router";
import BoldText from "../components/text/BoldText";
import { ICompletedWorkout, IUser } from "../types";
import workoutLogApi from "../api/workoutLogApi";
import LightText from "../components/text/LightText";
import RegularText from "../components/text/RegularText";
import { LinearGradientWrapper } from "../components/wrappers/LinearGradientWrapper";
import userApi from "../api/user/userApi";
import WorkoutItem from "./(workouts)/_components/WorkoutItem";

const HomeScreen = () => {
	const [recentWorkouts, setRecentWorkouts] = useState<ICompletedWorkout[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser>();

	useEffect(() => {
		const fetchRecentWorkouts = async () => {
			const workouts = await workoutLogApi.getCompletedWorkouts();
			setRecentWorkouts(workouts.slice(0, 3));
		};
		const fetchCurrentUser = async () => {
			const user = await userApi.getCurrent();
			setCurrentUser(user);
		};
		fetchRecentWorkouts();
		fetchCurrentUser();
	}, []);

	console.log(currentUser);

	return (
		<LinearGradientWrapper>
			{/* Some image here or a carousel */}
			<BoldText className="text-3xl text-white mb-4">
				Welcome, {currentUser?.username}
			</BoldText>
			{/* Workout for today (from the active routine) */}
			<WorkoutForToday currentUser={currentUser} />
			{/* Next activities */}
			{/* Last week's activities */}
		</LinearGradientWrapper>
	);
};

const WorkoutForToday = ({
	currentUser,
}: {
	currentUser: IUser | undefined;
}) => {
	return (
		<>
			<BoldText className="text-xl text-light-gray mb-2">
				Today's workout
			</BoldText>
			{currentUser?.activeRoutine ? (
				<View className="flex-row justify-between items-center">
					{currentUser.activeRoutine.weeklySchedule[new Date().getDay()]
						.workout ? (
						<WorkoutItem
							item={
								currentUser.activeRoutine.weeklySchedule[new Date().getDay()]
									.workout
							}
						/>
					) : (
						<LightText className="text-light-gray">
							No workout for today
						</LightText>
					)}
				</View>
			) : (
				<LightText className="text-light-gray">No active routine</LightText>
			)}
			<View className="h-4" />
		</>
	);
};

export default HomeScreen;
