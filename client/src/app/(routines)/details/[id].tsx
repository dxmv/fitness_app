import { View, Text, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import routinesApi from "../../../api/routinesApi";
import { IRoutine } from "../../../types";
import LightText from "../../../components/text/LightText";
import BoldText from "../../../components/text/BoldText";
import WeeklyScheduleRoutine from "../../../components/WeeklyScheduleRoutine";

const SingleRoutineScreen = () => {
	const [routine, setRoutine] = useState<IRoutine | null>(null);
	const { id } = useLocalSearchParams();
	const router = useRouter();

	// Fetch the routine details when the component mounts
	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await routinesApi.getRoutineById(id as string);
			setRoutine(routine);
		};
		fetchRoutine();
	}, []);

	// Show loading text while the routine is being fetched
	if (!routine) {
		return <LightText>Loading...</LightText>;
	}

	// Function to activate the routine
	const handleRoutineActivation = async (routineId: number) => {
		await routinesApi.activateRoutine(routineId);
	};

	// Function to delete the routine and redirect to the routines list
	const handleRoutineDeletion = async (routineId: number) => {
		try {
			await routinesApi.deleteRoutine(routineId);
			router.replace("/(routines)");
		} catch (error) {
			console.error("Error deleting routine:", error);
		}
		router.replace("/(routines)");
	};

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText className="text-3xl text-dark-black">{routine.name}</BoldText>
			<WeeklyScheduleRoutine weeklySchedule={routine.weeklySchedule} />
			<Button
				title="Make active"
				onPress={() => handleRoutineActivation(routine.id)}
			/>
			<Button
				title="Delete"
				onPress={() => handleRoutineDeletion(routine.id)}
			/>
		</View>
	);
};

export default SingleRoutineScreen;
