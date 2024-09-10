import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import BoldText from "../../../components/text/BoldText";
import LightText from "../../../components/text/LightText";
import { IWorkout, IWorkoutExercise } from "../../../types";
import RegularText from "../../../components/text/RegularText";

interface ISet {
	weight: number;
	reps: number;
}

const ActiveWorkoutScreen = () => {
	const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null);
	const [sets, setSets] = useState<{ [key: string]: Array<ISet> }>({});
	const { workout } = useLocalSearchParams();

	useEffect(() => {
		if (workout) {
			setActiveWorkout(JSON.parse(workout as string) as IWorkout);
		}
	}, [workout]);

	const addSet = (exerciseName: string) => {
		setSets(prevSets => {
			const newSet: ISet = { weight: 0, reps: 0 }; // Initialize with default values
			return {
				...prevSets,
				[exerciseName]: prevSets[exerciseName]
					? [...prevSets[exerciseName], newSet]
					: [newSet],
			};
		});
	};

	if (!activeWorkout) {
		return <LightText>Loading...</LightText>;
	}

	return (
		<View className="flex-1 bg-light-gray p-4">
			{/* Workout header */}
			<View className="flex-row justify-between items-center mb-4 border-b-2 border-dark-black">
				<BoldText className="text-3xl text-gray-800">
					{activeWorkout.name}
				</BoldText>
				<RegularText>Rest timer</RegularText>
			</View>
			{activeWorkout.workoutExercises.map((element, index) => (
				<WorkoutItemSkeleton
					workoutExercise={element}
					key={index}
					onAddSet={addSet}
				/>
			))}
		</View>
	);
};

const WorkoutItemSkeleton = ({
	workoutExercise,
	onAddSet,
}: {
	workoutExercise: IWorkoutExercise;
	onAddSet: (exerciseName: string) => void;
}) => {
	return (
		<View className="border-b-2 border-dark-black">
			<BoldText>{workoutExercise.exercise.name}</BoldText>
			<Button
				title="Add set"
				onPress={() => onAddSet(workoutExercise.exercise.name)}
			/>
		</View>
	);
};

export default ActiveWorkoutScreen;
