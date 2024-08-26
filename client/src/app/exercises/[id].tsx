import { View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { IExercise } from "../../types";
import exerciseApi from "../../api/exerciseApi";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import RegularText from "../../components/text/RegularText";

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
		return <LightText>Loading</LightText>;
	}

	return (
		<ScrollView>
			<Image
				className="w-11 h-11"
				source={{
					uri: "https://i.pinimg.com/originals/bc/d2/05/bcd205cf9e64811981d715deebaa41da.gif",
				}}
			/>
			<BoldText className="text-3xl">{exercise.name}</BoldText>
			<LightText className="text-sm">
				Muscle groups: {exercise.muscleGroups.join(", ")}
			</LightText>
			<RegularText className="mt-3 border-t-2 border-gray-600 pt-2">
				Lorem ipsum odor amet, consectetuer adipiscing elit. Porta enim felis
				per vehicula dolor mus. Tempus himenaeos consequat volutpat hac; integer
				imperdiet ad curabitur pharetra. Efficitur augue varius pretium porta
				ornare montes volutpat leo facilisis. Primis facilisi euismod tempor
				morbi quis. Nec dis libero mus tincidunt cras libero ultricies
				suspendisse. Conubia curabitur taciti vel faucibus diam dictum cursus
				habitasse. Facilisi finibus aenean vitae ex tortor pharetra ad interdum.
				Hac fringilla fames urna lacinia faucibus.
			</RegularText>
			{/* Youtube vids */}
		</ScrollView>
	);
};

export default ExerciseInfo;
