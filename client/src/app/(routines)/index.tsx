import { View, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IRoutine } from "../../types";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import { Feather } from "@expo/vector-icons";
import ReusableModal from "../../components/MyModal";
import { router } from "expo-router";
import routinesApi from "../../api/routines/routinesApi";
import userApi from "../../api/user/userApi";
import { LinearGradientWrapper } from "../../components/wrappers/LinearGradientWrapper";
import RoutineItem from "./_components/RoutineItem";

const RoutinesScreen = () => {
	// State to hold the list of routines
	const [routines, setRoutines] = useState<Array<IRoutine>>([]);
	const [activeRoutine, setActiveRoutine] = useState<IRoutine | null>(null);
	// State to control the visibility of the add routine modal
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
	// State to hold the name of the new routine being added
	const [newRoutineName, setNewRoutineName] = useState<string>("");

	// Effect to fetch routines & active routine when the component mounts
	useEffect(() => {
		const fetchRoutines = async () => {
			const routines = await routinesApi.getAllRoutines();
			setRoutines(routines);
		};
		const fetchActiveRoutine = async () => {
			const user = await userApi.getCurrent();
			setActiveRoutine(user.activeRoutine);
		};
		fetchRoutines();
		fetchActiveRoutine();
	}, []);

	// Function to handle the submission of a new routine
	const handleAddRoutineSubmit = async () => {
		const newRoutine = await routinesApi.createRoutine(newRoutineName);
		const updatedRoutines = await routinesApi.getAllRoutines();
		setRoutines(updatedRoutines);
		setNewRoutineName(""); // Clear the input field
		setIsAddModalVisible(false); // Close the modal
	};

	return (
		<LinearGradientWrapper>
			<View className="flex-row justify-between items-center mb-4">
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
					<Feather name="plus-circle" size={24} color="white" />
				</TouchableOpacity>
			</View>
			{/* Active routine part */}
			<BoldText className="text-3xl text-white mb-1">Active routine</BoldText>
			{activeRoutine ? (
				<RoutineItem item={activeRoutine} isActive={true} />
			) : (
				<LightText className="text-light-gray">No active routine</LightText>
			)}

			{/* All routines part */}
			<BoldText className="text-3xl text-white mb-1 mt-4">
				Your Routines
			</BoldText>
			{routines.length === 0 ? (
				<LightText className="text-light-gray">No routines to show</LightText>
			) : (
				<FlatList
					data={routines}
					renderItem={({ item }) => (
						<RoutineItem item={item} isActive={item.id === activeRoutine?.id} />
					)}
					keyExtractor={item => item.id.toString()}
					contentContainerStyle={{ paddingBottom: 100 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
			<ReusableModal
				isVisible={isAddModalVisible}
				onClose={() => setIsAddModalVisible(false)}
				title="Add New Routine"
			>
				<View>
					<TextInput
						className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
						placeholder="Enter routine name"
						value={newRoutineName}
						onChangeText={setNewRoutineName}
					/>
					<TouchableOpacity
						onPress={handleAddRoutineSubmit}
						className="bg-blue-500 py-2 px-4 rounded-lg"
					>
						<BoldText className="text-white text-center">Add Routine</BoldText>
					</TouchableOpacity>
				</View>
			</ReusableModal>
		</LinearGradientWrapper>
	);
};

export default RoutinesScreen;
