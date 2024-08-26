import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { IWorkout } from "../../types";
import workoutApi from "../../api/workoutApi";
import { useLocalSearchParams } from "expo-router";
import LightText from "../../components/text/LightText";
import BoldText from "../../components/text/BoldText";

const WorkoutScreen = () => {
	const [workout, setWorkout] = useState<IWorkout | null>();
	const { id } = useLocalSearchParams();

	// fetch the workout
	useEffect(() => {
		const getExercise = async () => {
			try {
				const res = await workoutApi.getById(Number.parseInt(id[0]));
				await setWorkout(res);
			} catch (e) {
				console.log(e);
			}
		};
		getExercise();
	}, []);

	if (!workout) {
		return <LightText>Loading...</LightText>;
	}

	return (
		<View>
			<BoldText className="text-2xl border-b-2 border-gray-500">
				{workout.name}
			</BoldText>
		</View>
	);
};

export default WorkoutScreen;
