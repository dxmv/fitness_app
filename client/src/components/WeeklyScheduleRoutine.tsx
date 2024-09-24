import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { IRoutineWorkout, IWorkout } from "../types";
import BoldText from "./text/BoldText";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import ReusableModal from "./MyModal";
import PrimaryButton from "./buttons/PrimaryButton";
import LightText from "./text/LightText";
import SecondaryButton from "./buttons/SecondaryButton";
import workoutApi from "../api/workoutApi";
import RegularText from "./text/RegularText";

// Component to display the weekly schedule of workouts
const WeeklyScheduleRoutine = ({
	weeklySchedule,
}: {
	weeklySchedule: IRoutineWorkout[];
}) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [selectedRoutineWorkout, setSelectedRoutineWorkout] =
		useState<IRoutineWorkout | null>(null);

	// Handle press on a routine workout to open the modal
	const handleRoutineWorkoutPress = (routineWorkout: IRoutineWorkout) => {
		setSelectedRoutineWorkout(routineWorkout);
		setOpenModal(true);
	};

	// Close the modal and reset selected workout
	const handleModalClose = () => {
		setSelectedRoutineWorkout(null);
		setOpenModal(false);
	};

	return (
		<View>
			<View className="flex-row bg-white rounded-lg py-2 w-full ">
				{weeklySchedule.map((routineWorkout, index) => (
					<TouchableOpacity
						key={routineWorkout.id}
						className={`flex-1 flex-col justify-center items-center p-1 w-1/7 ${
							index !== weeklySchedule.length - 1
								? "border-r-2 border-light-gray"
								: ""
						}`}
						onPress={() => handleRoutineWorkoutPress(routineWorkout)}
					>
						<BoldText className="mb-2">
							{routineWorkout.dayOfWeek.slice(0, 3)}
						</BoldText>
						{routineWorkout.workout ? (
							<Feather name="check-circle" size={20} color="green" />
						) : (
							<Feather name="x-circle" size={20} color="red" />
						)}
					</TouchableOpacity>
				))}
				{/* The modal for displaying workout details */}
				{openModal && selectedRoutineWorkout && (
					<DayOfWeekModal
						openModal={openModal}
						selectedRoutineWorkout={selectedRoutineWorkout}
						handleModalClose={handleModalClose}
					/>
				)}
			</View>
		</View>
	);
};

// Modal component for a specific day's workout
const DayOfWeekModal = ({
	openModal,
	selectedRoutineWorkout,
	handleModalClose,
}: {
	openModal: boolean;
	selectedRoutineWorkout: IRoutineWorkout;
	handleModalClose: () => void;
}) => {
	const [workoutAssignmentStage, setWorkoutAssignmentStage] =
		useState<boolean>(false);
	const [allWorkouts, setAllWorkouts] = useState<IWorkout[]>([]);
	const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
		null
	); // We only need the id to assign the workout

	// Fetch all workouts from the API
	const fetchAllWorkouts = async () => {
		const workouts = await workoutApi.getAll();
		await setAllWorkouts(workouts);
	};

	// Toggle the workout assignment stage
	const handleWorkoutAssignmentStage = () => {
		setWorkoutAssignmentStage(prev => !prev);
	};

	const assignWorkout = async () => {
		if (!selectedWorkoutId) {
			return; // No workout selected
		}

		// TODO: Assign the workout to the routine
	};

	// Fetch workouts when the assignment stage is active
	useEffect(() => {
		if (workoutAssignmentStage) {
			fetchAllWorkouts();
		}
	}, [workoutAssignmentStage]);

	return (
		<ReusableModal
			isVisible={openModal}
			onClose={() => handleModalClose()}
			title={
				workoutAssignmentStage
					? "Select a workout to assign"
					: selectedRoutineWorkout.dayOfWeek
			}
		>
			{selectedRoutineWorkout.workout ? (
				<View>
					{/* Display the name of the assigned workout */}
					<BoldText>{selectedRoutineWorkout.workout.name}</BoldText>
					{/* Delete button here */}
				</View>
			) : (
				<View>
					{workoutAssignmentStage ? (
						<View>
							<FlatList
								data={allWorkouts}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => setSelectedWorkoutId(item.id)}
										className={`p-4 mb-2 rounded-lg ${
											selectedWorkoutId === item.id ? "bg-blue-200" : "bg-white"
										}`}
									>
										<RegularText
											className={`${
												selectedWorkoutId === item.id
													? "font-bold"
													: "font-normal"
											}`}
										>
											{item.name}
										</RegularText>
									</TouchableOpacity>
								)}
							/>
							<PrimaryButton
								title="Assign this workout"
								onPress={handleWorkoutAssignmentStage}
								className="mb-4"
								disabled={!selectedWorkoutId}
							/>
							<SecondaryButton
								title="Cancel"
								onPress={handleWorkoutAssignmentStage}
							/>
						</View>
					) : (
						<View>
							<LightText className="mb-6 ">No workout assigned</LightText>
							<SecondaryButton
								title="Assign workout"
								onPress={handleWorkoutAssignmentStage}
								className="mb-4"
							/>
							<PrimaryButton
								title="Remove the workout"
								onPress={handleWorkoutAssignmentStage}
							/>
						</View>
					)}
				</View>
			)}
		</ReusableModal>
	);
};

export default WeeklyScheduleRoutine;
