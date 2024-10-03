import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { IWorkoutExercise } from "../../../types";
import LightText from "../../../components/text/LightText";
import RightSwipeWrapper from "../../../components/wrappers/RightSwipeWrapper";
import workoutApi from "../../../api/workoutApi";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Define the props for the WorkoutExerciseItem component
interface WorkoutExerciseItemProps {
	workoutExercise: IWorkoutExercise; // The workout exercise data
	workoutId: number; // The id of the workout
}

// Functional component for displaying a workout exercise item
const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({
	workoutExercise,
	workoutId,
}) => {
	const handleDeleteExercise = async () => {
		try {
			await workoutApi.removeExerciseFromWorkout(workoutId, workoutExercise.id);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<RightSwipeWrapper
			onRightSwipe={handleDeleteExercise}
			className="bg-light-purple p-4 rounded-lg shadow-md" // Using NativeWind classes
		>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center gap-2">
					<Image
						source={{
							uri: "https://m.media-amazon.com/images/I/61lpZ1gGxkL._AC_UF1000,1000_QL80_.jpg",
						}}
						width={32}
						height={32}
						className="rounded-md"
					/>
					<LightText className="text-lg font-bold text-secondary-purple">
						{workoutExercise.exercise.name}
					</LightText>
				</View>
				{/* Info button */}
				<TouchableOpacity
					onPress={() =>
						router.push(`/exercises/${workoutExercise.exercise.id}`)
					}
				>
					<Feather name="info" size={24} color="#F5F5F5" />
				</TouchableOpacity>
			</View>
		</RightSwipeWrapper>
	);
};

export default WorkoutExerciseItem;
