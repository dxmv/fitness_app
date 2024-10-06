import { View, Button, TouchableOpacity } from "react-native";
import BoldText from "../../../components/text/BoldText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IExerciseSet, IWorkout } from "../../../types";
import RegularText from "../../../components/text/RegularText";
import workoutLogApi from "../../../api/workoutLogApi";
import { LinearGradientWrapper } from "../../../components/wrappers/LinearGradientWrapper";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";

// Screen that shows when the workout is finished
export default function End() {
	const router = useRouter();
	const { workout, sets } = useLocalSearchParams<{
		workout: string;
		sets: string;
	}>();

	const parsedWorkout: any = JSON.parse(workout);
	const parsedSets: Record<string, IExerciseSet[]> = JSON.parse(sets);

	// Function to handle saving the workout data
	const handleSaveWorkout = async () => {
		const finalWorkout = {
			workoutId: parsedWorkout.id,
			exercises: Object.entries(parsedSets).map(([exerciseId, sets]) => ({
				exerciseId: parseInt(exerciseId, 10),
				sets: sets.map(({ weight, reps }) => ({ weight, reps })),
				orderInWorkout: 0,
			})),
		};
		console.log("finalWorkout", finalWorkout.exercises[0].sets);
		try {
			const response = await workoutLogApi.completeWorkout(finalWorkout);
			console.log("response", response);
		} catch (error) {
			console.log("error", error);
		}
		handleContinueWorkout();
	};

	const handleContinueWorkout = () => {
		router.push("/");
	};

	return (
		<LinearGradientWrapper className="flex-1 justify-center items-center">
			{/* Header */}
			<View className="items-center">
				<Ionicons name="trophy" size={80} color="#7B1FA2" />
				<BoldText className="text-4xl text-white mt-4 mb-2">
					Congratulations!
				</BoldText>
				<RegularText className="text-light-gray text-lg mb-6">
					Workout finished!
				</RegularText>
			</View>

			{/* Workout Summary */}
			<View className="bg-dark-black bg-opacity-50 rounded-lg w-full">
				<View className="flex-row justify-between items-center py-6">
					<View className="items-center w-1/3">
						<Ionicons name="barbell-outline" size={24} color="#FF8A80" />
						<RegularText className="text-light-gray mt-2">
							{
								Object.keys(parsedSets).filter(
									exercise => parsedSets[exercise].length > 0
								).length
							}{" "}
							Exercises
						</RegularText>
					</View>
					<View className="items-center w-1/3">
						<Ionicons name="repeat-outline" size={24} color="#E1BEE7" />
						<RegularText className="text-light-gray mt-2">
							{Object.entries(parsedSets).reduce(
								(prev, current) => prev + current[1].length,
								0
							)}{" "}
							Sets
						</RegularText>
					</View>
					<View className="items-center w-1/3">
						<Ionicons name="fitness-outline" size={24} color="#FF4081" />
						<RegularText className="text-light-gray mt-2">
							{Object.entries(parsedSets).reduce(
								(prev, current) =>
									prev +
									current[1].reduce(
										(prev, current) => prev + current.weight,
										0
									),
								0
							)}{" "}
							kg
						</RegularText>
					</View>
				</View>
			</View>
			{/* Buttons */}
			<View className="w-full mt-4">
				<PrimaryButton
					title="SAVE WORKOUT"
					onPress={handleSaveWorkout}
					className="mb-4"
				/>
				<SecondaryButton title="CONTINUE" onPress={handleContinueWorkout} />
			</View>
		</LinearGradientWrapper>
	);
}
