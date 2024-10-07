import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { IExercise } from "../../types";
import exerciseApi from "../../api/exerciseApi";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import RegularText from "../../components/text/RegularText";
import Loading from "../../components/Loading";
import { Feather } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const ExerciseInfo = () => {
	const [exercise, setExercise] = useState<IExercise | null>(null);
	const { id } = useLocalSearchParams();

	// fetch the exercise
	useEffect(() => {
		const getExercise = async () => {
			try {
				const res = await exerciseApi.getById(Number.parseInt(id[0]));
				await setExercise(res);
			} catch (e) {
				console.log(e);
			}
		};
		getExercise();
	}, []);

	if (!exercise) {
		return <Loading />;
	}

	return (
		<ScrollView className="flex-1 bg-dark-black p-4">
			<TouchableOpacity onPress={() => router.back()} className="mb-4">
				<Feather name="arrow-left" size={24} color="white" />
			</TouchableOpacity>
			{/* Gif showing how to do the exercise */}
			<Image
				className="w-full h-48 rounded-lg mb-4"
				source={{
					uri: "https://i.pinimg.com/originals/bc/d2/05/bcd205cf9e64811981d715deebaa41da.gif",
				}}
			/>
			{/* Exercise info */}
			<BoldText className="text-3xl text-primary-pink mb-2">
				{exercise.name}
			</BoldText>
			<View className="bg-secondary-purple rounded-full px-3 py-1 self-start mb-4">
				<LightText className="text-sm text-light-gray">
					{exercise.muscleGroups.join(", ")}
				</LightText>
			</View>
			<View className="bg-dark-purple rounded-lg p-4 mb-4">
				<RegularText className="text-light-gray">
					Lorem ipsum odor amet, consectetuer adipiscing elit. Porta enim felis
					per vehicula dolor mus. Tempus himenaeos consequat volutpat hac;
					integer imperdiet ad curabitur pharetra.
				</RegularText>
			</View>
			{/* Youtube vids */}
		</ScrollView>
	);
};

export default ExerciseInfo;
