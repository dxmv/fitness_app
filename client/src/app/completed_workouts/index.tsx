import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import BoldText from "../../components/text/BoldText";
import workoutLogApi from "../../api/workoutLogApi";
import { ICompletedWorkout } from "../../types";
import RegularText from "../../components/text/RegularText";
import LightText from "../../components/text/LightText";
import ReusableModal from "../../components/MyModal";
import RightSwipeWrapper from "../../components/wrappers/RightSwipeWrapper";

const CompletedWorkoutsScreen = () => {
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
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText>Completed workouts</BoldText>
			{completedWorkouts.map(workout => (
				<RightSwipeWrapper
					key={workout.id}
					onRightSwipe={() => {
						handleDeleteWorkout(workout);
					}}
				>
					<View className="flex-row justify-between">
						<TouchableOpacity onPress={() => handleShowWorkoutLog(workout)}>
							<RegularText>{workout.workout.name}</RegularText>
							<LightText>{workout.completedAt}</LightText>
						</TouchableOpacity>
					</View>
				</RightSwipeWrapper>
			))}
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
		</View>
	);
};

export default CompletedWorkoutsScreen;
