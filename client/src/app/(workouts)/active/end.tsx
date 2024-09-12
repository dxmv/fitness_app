import { View, Text, Button } from "react-native";
import BoldText from "../../../components/text/BoldText";
import { useRouter } from "expo-router";

// Screen that shows when the workout is finished
export default function End() {
	const router = useRouter();

	const handleSaveWorkout = () => {
		console.log("save workout");
	};

	const handleContinueWorkout = () => {
		router.push("/");
	};

	return (
		<View>
			<BoldText>Workout finished</BoldText>
			{/* List of exercises done */}
			<Button title="SAVE" onPress={handleSaveWorkout} />
			<Button title="CONTINUE" onPress={handleContinueWorkout} />
		</View>
	);
}
