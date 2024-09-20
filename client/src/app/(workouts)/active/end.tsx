import { View, Button } from "react-native";
import BoldText from "../../../components/text/BoldText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IExerciseSet, IWorkout } from "../../../types";
import RegularText from "../../../components/text/RegularText";
import workoutLogApi from "../../../api/workoutLogApi";

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
		<View>
			<BoldText>Workout finished!</BoldText>
			<RegularText>
				Exercises done:{" "}
				{
					Object.keys(parsedSets).filter(
						exercise => parsedSets[exercise].length > 0
					).length
				}
			</RegularText>
			{/* List of exercises done */}
			{Object.entries(parsedSets).map(([exerciseName, exerciseSets]) => (
				<View key={exerciseName}>
					<RegularText>
						{exerciseName}: {exerciseSets.length} sets
					</RegularText>
				</View>
			))}
			<RegularText>
				Total sets:{" "}
				{Object.entries(parsedSets).reduce(
					(prev, current) => prev + current[1].length,
					0
				)}
			</RegularText>
			<RegularText>
				Total weight:{" "}
				{Object.entries(parsedSets).reduce(
					(prev, current) =>
						prev +
						current[1].reduce((prev, current) => prev + current.weight, 0),
					0
				)}{" "}
				kg
			</RegularText>
			<Button title="SAVE" onPress={handleSaveWorkout} />
			<Button title="CONTINUE" onPress={handleContinueWorkout} />
		</View>
	);
}
