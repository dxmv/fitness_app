import { Button, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IWorkout } from "../../../types";
import workoutApi from "../../../api/workoutApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import LightText from "../../../components/text/LightText";
import BoldText from "../../../components/text/BoldText";

import WorkoutExerciseItem from "../_components/WorkoutExerciseItem";
import EditNameModal from "../../../components/modals/EditNameModal";
import FloatingButton from "../../../components/buttons/FloatingButton";
import { LinearGradientWrapper } from "../../../components/wrappers/LinearGradientWrapper";
import { Feather } from "@expo/vector-icons";
import SecondaryButton from "../../../components/buttons/SecondaryButton";

const WorkoutScreen = () => {
	const router = useRouter();
	const [workout, setWorkout] = useState<IWorkout | null>(null);
	const { id } = useLocalSearchParams();
	const [isEditing, setIsEditing] = useState<boolean>(false);

	useEffect(() => {
		// Fetch the workout details
		const getWorkout = async () => {
			try {
				const res = await workoutApi.getById(id.toString());
				await setWorkout(res);
			} catch (e) {
				console.log(e);
			}
		};
		getWorkout();
	}, []);

	if (!workout) {
		return <LightText>Loading...</LightText>;
	}

	const handleDeleteWorkout = async () => {
		try {
			await workoutApi.deleteWorkout(workout.id);
		} catch (e) {
			console.log(e);
		} finally {
			router.back();
		}
	};

	const handleStartWorkout = () => {
		// if the workout has no exercises, don't allow the user to start the workout
		if (workout.workoutExercises.length <= 0) {
			return;
		}
		router.push({
			pathname: "/active",
			params: { workout: JSON.stringify(workout) },
		});
	};

	const handleUpdateWorkout = async (id: number, name: string) => {
		try {
			const res = await workoutApi.updateWorkout(id, { name });
			setWorkout(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<LinearGradientWrapper>
			{/* Workout header */}
			<View className="flex-row justify-between items-center mb-4">
				<TouchableOpacity onPress={() => setIsEditing(true)}>
					<BoldText className="text-3xl text-white">{workout.name}</BoldText>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleDeleteWorkout}>
					<Feather name="trash-2" size={24} color="white" />
				</TouchableOpacity>
			</View>
			{/* List of exercises in the workout */}
			{workout.workoutExercises && workout.workoutExercises.length === 0 ? (
				<LightText className="text-light-gray">No exercises yet</LightText>
			) : (
				workout.workoutExercises.map(workoutExercise => (
					<WorkoutExerciseItem
						key={workoutExercise.id}
						workoutExercise={workoutExercise}
						workoutId={workout.id}
					/>
				))
			)}
			<View className="mb-6"></View>
			<SecondaryButton title="Start Workout" onPress={handleStartWorkout} />
			{/* Floating button to add an exercise to the workout */}
			<FloatingButton
				onPress={() =>
					router.push({
						pathname: `/add-exercise/${workout.id}`,
						params: {
							exerciseIds: JSON.stringify(
								workout.workoutExercises.map(ex => ex.exercise.id)
							),
						},
					})
				}
				iconName="plus-circle"
				className="bg-primary-pink"
			/>
			{/* Reusable edit name modal */}
			<EditNameModal
				isVisible={isEditing}
				onClose={() => setIsEditing(false)}
				itemId={workout.id}
				originalItemName={workout.name}
				updateItemApi={handleUpdateWorkout}
			/>
		</LinearGradientWrapper>
	);
};

export default WorkoutScreen;
