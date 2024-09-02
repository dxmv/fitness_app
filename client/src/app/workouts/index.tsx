import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import BoldText from "../../components/text/BoldText";
import { IWorkout } from "../../types";
import LightText from "../../components/text/LightText";
import workoutApi from "../../api/workoutApi";
import WorkoutItem from "./components/WorkoutItem";
import { Feather } from "@expo/vector-icons";
import ReusableModal from "../../components/MyModal";

const AllWorkouts = () => {
	const [workouts, setWorkouts] = useState<Array<IWorkout> | null>(null);
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
	const [newWorkoutName, setNewWorkoutName] = useState<string>("");

	useEffect(() => {
		const getAll = async () => {
			try {
				const workouts = await workoutApi.getAll();
				setWorkouts(workouts);
			} catch (e) {
				setWorkouts(null);
			}
		};
		getAll();
	}, []);

	const handleAddWorkout = () => {
		setIsAddModalVisible(true);
	};

	const handleAddWorkoutSubmit = async () => {
		if (newWorkoutName.trim()) {
			try {
				// Assuming your API has a create method. Adjust as necessary.
				// const newWorkout = await workoutApi.create({
				//   name: newWorkoutName.trim(),
				// });
				// setWorkouts(prevWorkouts =>
				//   prevWorkouts ? [...prevWorkouts, newWorkout] : [newWorkout]
				// );
				setNewWorkoutName("");
				setIsAddModalVisible(false);
			} catch (e) {
				console.error("Failed to add workout", e);
			}
		}
	};

	const handleEditWorkout = (workout: IWorkout) => {
		// Implement edit workout logic
		console.log("Edit workout", workout.id);
	};

	const handleDeleteWorkout = (workout: IWorkout) => {
		// Implement delete workout logic
		console.log("Delete workout", workout.id);
	};

	return (
		<View className="flex-1">
			<View className="flex-row justify-between items-center mb-4">
				<BoldText className="text-3xl">Your workouts</BoldText>
				<TouchableOpacity onPress={handleAddWorkout}>
					<Feather name="plus-circle" size={30} color="black" />
				</TouchableOpacity>
			</View>
			{workouts ? (
				workouts.map(el => <WorkoutItem key={el.id} item={el} />)
			) : (
				<LightText>No workouts to show</LightText>
			)}
			<ReusableModal
				isVisible={isAddModalVisible}
				onClose={() => setIsAddModalVisible(false)}
				title="Add New Workout"
			>
				<View>
					<TextInput
						className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
						placeholder="Enter workout name"
						value={newWorkoutName}
						onChangeText={setNewWorkoutName}
					/>
					<TouchableOpacity
						onPress={handleAddWorkoutSubmit}
						className="bg-blue-500 py-2 px-4 rounded-lg"
					>
						<BoldText className="text-white text-center">Add Workout</BoldText>
					</TouchableOpacity>
				</View>
			</ReusableModal>
		</View>
	);
};
