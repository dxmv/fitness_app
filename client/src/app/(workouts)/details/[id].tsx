import { Button, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IWorkout, IExercise } from "../../../types";
import workoutApi from "../../../api/workoutApi";
import exerciseApi from "../../../api/exerciseApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import LightText from "../../../components/text/LightText";
import BoldText from "../../../components/text/BoldText";
import { Feather } from "@expo/vector-icons";
import ReusableModal from "../../../components/MyModal";
import WorkoutExerciseItem from "../_components/WorkoutExerciseItem";

const WorkoutScreen = () => {
	const router = useRouter();
	const [workout, setWorkout] = useState<IWorkout | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const { id } = useLocalSearchParams();

	// Toggle modal visibility
	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	// Add exercise to the workout
	const addExercise = async (exerciseId: string) => {
		try {
			const updatedWorkout = await workoutApi.addExerciseToWorkout(
				id.toString(),
				exerciseId
			);
			setWorkout(updatedWorkout);
			toggleModal();
		} catch (e) {
			console.log(e);
		}
	};

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
		// Fetch all available exercises
		const getAllExercises = async () => {
			try {
				const res = await exerciseApi.getAll();
				await setExercises(res);
			} catch (e) {
				console.log(e);
			}
		};
		getWorkout();

		getAllExercises();
	}, []);

	if (!workout) {
		return <LightText>Loading...</LightText>;
	}

	const handleDeleteExercise = async (exerciseId: number) => {
		try {
			// Assuming you have an API function to remove an exercise from a workout
			await workoutApi.removeExerciseFromWorkout(workout.id, exerciseId);
		} catch (e) {
			console.log(e);
		}
	};

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

	return (
		<View className="flex-1 bg-gray-100 p-4">
			{/* Workout header */}
			<View className="flex-row justify-between items-center mb-4">
				<BoldText className="text-3xl text-gray-800">{workout.name}</BoldText>
				<TouchableOpacity onPress={toggleModal}>
					<Feather name="plus-circle" size={30} color="#4F46E5" />
				</TouchableOpacity>
			</View>
			{/* List of exercises in the workout */}
			{workout.workoutExercises && workout.workoutExercises.length === 0 ? (
				<LightText>No exercises yet</LightText>
			) : (
				workout.workoutExercises.map(workoutExercise => (
					<WorkoutExerciseItem
						key={workoutExercise.id}
						workoutExercise={workoutExercise}
						onDelete={handleDeleteExercise}
					/>
				))
			)}
			<View className="mb-10"></View>
			<Button title="Start Workout" onPress={handleStartWorkout} />
			<Button title="Delete Workout" onPress={handleDeleteWorkout} />
			{/* Modal for adding exercises */}
			<ReusableModal
				isVisible={isModalVisible}
				onClose={toggleModal}
				title="Add Exercise"
			>
				<View>
					{/* List of available exercises */}
					{exercises.map(exercise => (
						<TouchableOpacity
							key={exercise.id}
							onPress={() => addExercise(exercise.id.toString())}
							className="py-2"
						>
							<LightText>{exercise.name}</LightText>
						</TouchableOpacity>
					))}
				</View>
			</ReusableModal>
		</View>
	);
};

export default WorkoutScreen;
