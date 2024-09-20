import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import routinesApi from "../../../api/routinesApi";
import { IRoutine } from "../../../types";
import LightText from "../../../components/text/LightText";
import BoldText from "../../../components/text/BoldText";

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

	console.log(Object.entries(routine.weeklySchedule));

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText>{routine.name}</BoldText>
			<FlatList
				data={routine.weeklySchedule}
				renderItem={({ item }) => <Text>{item.dayOfWeek}</Text>}
			/>
		</View>
	);
};

export default SingleRoutineScreen;
