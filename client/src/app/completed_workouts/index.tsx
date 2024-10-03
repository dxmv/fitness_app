import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import BoldText from "../../components/text/BoldText";
import workoutLogApi from "../../api/workoutLogApi";
import { ICompletedWorkout } from "../../types";
import RegularText from "../../components/text/RegularText";
import LightText from "../../components/text/LightText";
import ReusableModal from "../../components/MyModal";
import RightSwipeWrapper from "../../components/wrappers/RightSwipeWrapper";
import { LinearGradientWrapper } from "../../components/wrappers/LinearGradientWrapper";
import { Feather } from "@expo/vector-icons";
import CompletedWorkoutItem from "./_components/CompletedWorkoutItem";

const CompletedWorkoutsScreen = () => {
	const router = useRouter();

	// State to hold completed workouts
	const [completedWorkouts, setCompletedWorkouts] = useState<
		ICompletedWorkout[]
	>([]);

	// State to manage the currently selected workout log for the modal
	const [modalLog, setModalLog] = useState<ICompletedWorkout | null>(null);
	// State to control the visibility of the modal
	const [showModal, setShowModal] = useState<boolean>(false);

	// Function to fetch recent completed workouts from the API
	const fetchRecentWorkouts = async () => {
		const workouts = await workoutLogApi.getCompletedWorkouts();
		setCompletedWorkouts(workouts); // Update state with fetched workouts
	};

	// useEffect to fetch workouts when the component mounts
	useEffect(() => {
		fetchRecentWorkouts();
	}, []);

	// Function to show the workout log in a modal
	const handleShowWorkoutLog = (workout: ICompletedWorkout) => {
		setModalLog(workout); // Set the selected workout log
		setShowModal(true); // Show the modal
	};

	// Function to delete a workout log
	const handleDeleteWorkout = async (workout: ICompletedWorkout) => {
		try {
			await workoutLogApi.deleteWorkoutLog(workout.id); // Call API to delete the workout
			await fetchRecentWorkouts(); // Refresh the list of workouts
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<LinearGradientWrapper>
			{/* Back button */}
			<TouchableOpacity onPress={() => router.back()} className="mb-8">
				<Feather name="arrow-left" size={24} color="white" />
			</TouchableOpacity>
			{/* Title */}
			<BoldText className="text-2xl text-white mb-4">
				Completed workouts
			</BoldText>
			{/* List of completed workouts */}
			<FlatList
				data={completedWorkouts}
				keyExtractor={workout => workout.id.toString()}
				renderItem={({ item: workout }) => (
					<CompletedWorkoutItem workout={workout} />
				)}
			/>
			{showModal && modalLog && (
				<ReusableModal
					isVisible={showModal}
					onClose={() => setShowModal(false)}
					title={modalLog.workout.name}
				>
					<View>
						{modalLog.completedExercises.map(completedExercise => (
							<View
								key={completedExercise.orderInWorkout}
								className="flex-row justify-between"
							>
								<RegularText>{completedExercise.exercise.name}</RegularText>
								{completedExercise.exerciseSetLogs.map((set, index) => (
									<View key={index} className="flex-row">
										<RegularText>
											{set.reps} reps x {set.weight} kg
										</RegularText>
									</View>
								))}
							</View>
						))}
					</View>
					<RegularText>
						Completed at: {modalLog.completedAt.slice(0, 10)}
					</RegularText>
				</ReusableModal>
			)}
		</LinearGradientWrapper>
	);
};

export default CompletedWorkoutsScreen;
