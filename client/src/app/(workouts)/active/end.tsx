import { View, Button } from "react-native";
import BoldText from "../../../components/text/BoldText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IExerciseSet, IWorkout } from "../../../types";
import RegularText from "../../../components/text/RegularText";

// Screen that shows when the workout is finished
export default function End() {
	const router = useRouter();
	const { workout, sets } = useLocalSearchParams<{
		workout: string;
		sets: string;
	}>();

	const parsedWorkout: IWorkout = JSON.parse(workout);
	const parsedSets: Record<string, IExerciseSet[]> = JSON.parse(sets);

	const handleSaveWorkout = () => {
		console.log("save workout", parsedWorkout, parsedSets);
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
