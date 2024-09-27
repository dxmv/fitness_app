import { View, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import LightText from "../../../components/text/LightText";
import routinesApi from "../../../api/routines/routinesApi";
import { IRoutine } from "../../../types";
import BoldText from "../../../components/text/BoldText";
import WeeklyScheduleRoutine from "../../../components/WeeklyScheduleRoutine";
import ReusableModal from "../../../components/MyModal";
import CustomTextInput from "../../../components/CustomTextInput";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { LinearGradientWrapper } from "../../../components/wrappers/LinearGradientWrapper";
import { Feather } from "@expo/vector-icons";
import Dropdown from "../../../components/Dropdown";

const SingleRoutineScreen = () => {
	const [routine, setRoutine] = useState<IRoutine | null>(null);
	const { id, isActive } = useLocalSearchParams();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const router = useRouter();

	// Fetch the routine details when the component mounts
	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await routinesApi.getRoutineById(id as string);
			setRoutine(routine);
		};
		fetchRoutine();
	}, []);

	// Show loading text while the routine is being fetched
	if (!routine) {
		return <LightText>Loading...</LightText>;
	}

	// Function to delete the routine and redirect to the routines list
	const handleRoutineDeletion = async (routineId: number) => {
		try {
			await routinesApi.deleteRoutine(routineId);
			router.replace("/(routines)");
		} catch (error) {
			console.error("Error deleting routine:", error);
		}
		router.replace("/(routines)");
	};

	const handleActivity = async () => {
		if (isActive === "1") {
			await handleDeactivateRoutine();
		} else {
			await handleActivateRoutine();
		}
		router.replace("/(routines)");
	};

	const handleActivateRoutine = async () => {
		await routinesApi.activateRoutine(routine.id);
	};

	const handleDeactivateRoutine = async () => {
		await routinesApi.deactivateRoutine();
	};

	return (
		<LinearGradientWrapper>
			<View className="flex-row justify-between items-center mb-4">
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Dropdown
					options={[
						{
							label: `${isActive ? "Deactivate" : "Activate"}`,
							onPress: () => handleActivity(),
						},
						{
							label: "Delete",
							onPress: () => handleRoutineDeletion(routine.id),
						},
					]}
				/>
			</View>
			<TouchableOpacity onPress={() => setIsEditing(true)}>
				<BoldText className="text-3xl text-white mb-4">{routine.name}</BoldText>
			</TouchableOpacity>
			<WeeklyScheduleRoutine
				weeklySchedule={routine.weeklySchedule}
				routineId={routine.id}
			/>
			{/* Recent workouts for this routine */}
			<BoldText className="text-xl text-light-gray my-4">
				Recent workouts for this routine
			</BoldText>
			<EditNameModal
				isVisible={isEditing}
				onClose={() => setIsEditing(false)}
				routineId={routine.id}
				originalRoutineName={routine.name}
			/>
		</LinearGradientWrapper>
	);
};

const EditNameModal = ({
	isVisible,
	onClose,
	routineId,
	originalRoutineName,
}: {
	isVisible: boolean;
	routineId: number;
	originalRoutineName: string;
	onClose: () => void;
}) => {
	const [routineName, setRoutineName] = useState<string>(originalRoutineName);

	const handleSave = async () => {
		// save the new name
		try {
			await routinesApi.updateRoutine(routineId, { name: routineName });
		} catch (e) {
			console.log(e);
		}
		onClose();
	};

	return (
		<ReusableModal
			isVisible={isVisible}
			onClose={onClose}
			title="Edit Workout Name"
		>
			<View>
				<CustomTextInput
					label="Routine Name"
					value={routineName}
					onChangeText={setRoutineName}
					placeholder="Workout Name"
				/>
				<PrimaryButton title="Save" onPress={handleSave} />
			</View>
		</ReusableModal>
	);
};

export default SingleRoutineScreen;
