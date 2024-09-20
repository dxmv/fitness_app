import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import BoldText from "../../components/text/BoldText";
import workoutLogApi from "../../api/workoutLogApi";
import { ICompletedWorkout } from "../../types";
import RegularText from "../../components/text/RegularText";
import LightText from "../../components/text/LightText";
import ReusableModal from "../../components/MyModal";

const CompletedWorkoutsScreen = () => {
	const [completedWorkouts, setCompletedWorkouts] = useState<
		ICompletedWorkout[]
	>([]);

	const [modalLog, setModalLog] = useState<ICompletedWorkout | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchRecentWorkouts = async () => {
			const workouts = await workoutLogApi.getCompletedWorkouts();
			setCompletedWorkouts(workouts);
		};
		fetchRecentWorkouts();
	}, []);

	const handleShowWorkoutLog = (workout: ICompletedWorkout) => {
		setModalLog(workout);
		console.log("workout", workout);
		setShowModal(true);
	};

	return (
		<View className="flex-1 bg-gray-100 p-4">
			<BoldText>Completed workouts</BoldText>
			{completedWorkouts.map(workout => (
				<TouchableOpacity
					key={workout.id}
					className="flex-row justify-between"
					onPress={() => handleShowWorkoutLog(workout)}
				>
					<RegularText>{workout.workout.name}</RegularText>
					<LightText>{workout.completedAt}</LightText>
				</TouchableOpacity>
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
							</View>
						))}
					</View>
					<RegularText>Completed at: {modalLog.completedAt}</RegularText>
				</ReusableModal>
			)}
		</View>
	);
};

export default CompletedWorkoutsScreen;
