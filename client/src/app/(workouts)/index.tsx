import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import BoldText from "../../components/text/BoldText";
import { IWorkout } from "../../types";
import LightText from "../../components/text/LightText";
import workoutApi from "../../api/workoutApi";
import WorkoutItem from "./_components/WorkoutItem";
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

	// Function to handle the submission of a new workout
	const handleAddWorkoutSubmit = async () => {
		// Check if the new workout name is not empty after trimming
		if (newWorkoutName.trim()) {
			try {
				// Create a new workout using the API
				const newWorkout = await workoutApi.createWorkout(
					newWorkoutName.trim()
				);
				// get the updated list of workouts
				const updatedWorkouts = await workoutApi.getAll();
				setWorkouts(updatedWorkouts);
				setNewWorkoutName("");
				setIsAddModalVisible(false);
			} catch (e) {
				console.error("Failed to add workout", e);
			}
		}
	};

	const renderWorkoutItem = ({ item }: { item: IWorkout }) => (
		<WorkoutItem item={item} />
	);

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<View className="flex-row justify-between items-center mb-4">
				<BoldText className="text-3xl text-dark-black">Your Workouts</BoldText>
				<TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
					<Feather name="plus-circle" size={30} color="#4F46E5" />
				</TouchableOpacity>
			</View>
			{workouts && workouts.length > 0 ? (
				<FlatList
					data={workouts}
					renderItem={renderWorkoutItem}
					keyExtractor={item => item.id.toString()}
					contentContainerStyle={{ paddingBottom: 100 }}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<LightText className="text-center text-dark-black">
					No workouts to show
				</LightText>
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

export default AllWorkouts;
