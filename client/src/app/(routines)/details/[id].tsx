import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import routinesApi from "../../../api/routinesApi";
import { IRoutine } from "../../../types";
import LightText from "../../../components/text/LightText";
import BoldText from "../../../components/text/BoldText";
import WeeklyScheduleRoutine from "../../../components/WeeklyScheduleRoutine";

const SingleRoutineScreen = () => {
	const [routine, setRoutine] = useState<IRoutine | null>(null);
	const { id } = useLocalSearchParams();

	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await routinesApi.getRoutineById(id as string);
			setRoutine(routine);
		};
		fetchRoutine();
	}, []);

	if (!routine) {
		return <LightText>Loading...</LightText>;
	}

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText className="text-3xl text-dark-black">{routine.name}</BoldText>
			<WeeklyScheduleRoutine weeklySchedule={routine.weeklySchedule} />
		</View>
	);
};

export default SingleRoutineScreen;
