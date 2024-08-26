import { View, Text } from "react-native";
import React, { useState } from "react";
import { IWorkout } from "../../types";

const WorkoutScreen = () => {
	const [workout, setWorkout] = useState<IWorkout | null>();

	return (
		<View>
			<Text>WorkoutScreen</Text>
		</View>
	);
};

export default WorkoutScreen;
