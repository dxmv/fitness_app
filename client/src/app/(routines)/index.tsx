import { View, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IRoutine } from "../../types";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import { Feather } from "@expo/vector-icons";
import ReusableModal from "../../components/MyModal";
import RegularText from "../../components/text/RegularText";
import { Link, router } from "expo-router";
import RightSwipeWrapper from "../../components/wrappers/RightSwipeWrapper";
import routinesApi from "../../api/routines/routinesApi";
import userApi from "../../api/user/userApi";

const RoutinesScreen = () => {
	// State to hold the list of routines
	const [routines, setRoutines] = useState<Array<IRoutine>>([]);
	const [activeRoutine, setActiveRoutine] = useState<IRoutine | null>(null);
	// State to control the visibility of the add routine modal
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
	// State to hold the name of the new routine being added
	const [newRoutineName, setNewRoutineName] = useState<string>("");

	// Effect to fetch routines when the component mounts
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
		<View className="flex-1 bg-gray-100 p-4">
			<View className="flex-row justify-between items-center mb-4">
				<BoldText className="text-3xl text-dark-black">Your Routines</BoldText>
				<TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
					<Feather name="plus-circle" size={30} color="#4F46E5" />
				</TouchableOpacity>
			</View>

			{activeRoutine && (
				<View>
					<BoldText>Active Routine</BoldText>
					<RoutineItem item={activeRoutine} isActive={true} />
				</View>
			)}
			{routines.length === 0 ? (
				<LightText>No routines to show</LightText>
			) : (
				<FlatList
					data={routines}
					renderItem={({ item }) => <RoutineItem item={item} />}
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
		</View>
	);
};

const RoutineItem = ({
	item,
	isActive = false,
}: {
	item: IRoutine;
	isActive?: boolean;
}) => {
	const handleActivity = async () => {
		if (isActive) {
			handleDeactivateRoutine();
		} else {
			handleActivateRoutine();
		}
	};

	const handleActivateRoutine = async () => {
		await routinesApi.activateRoutine(item.id);
	};

	const handleDeactivateRoutine = async () => {
		await routinesApi.deactivateRoutine();
	};

	return (
		<RightSwipeWrapper
			onRightSwipe={() => {
				console.log("delete");
			}}
		>
			<TouchableOpacity
				onPress={() => {
					router.push({
						pathname: `/(routines)/details/${item.id}`,
						params: {
							isActive: isActive ? 1 : 0,
						},
					});
				}}
				className="flex-row justify-between items-center"
			>
				<RegularText>{item.name}</RegularText>
				<TouchableOpacity onPress={handleActivity}>
					<RegularText>{isActive ? "Deactivate" : "Activate"}</RegularText>
				</TouchableOpacity>
			</TouchableOpacity>
		</RightSwipeWrapper>
	);
};

export default RoutinesScreen;
