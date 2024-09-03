import { View } from "react-native";
import React from "react";
import "expo-router/entry";
import { Link } from "expo-router";
import BoldText from "../components/text/BoldText";

const index = () => {
	return (
		<View>
			<BoldText>Welcome</BoldText>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Register</Link>
			<Link href="/(user)/profile">Go to User Profile</Link>
			<Link href="/exercises/1">Go to Exercise</Link>
			<Link href="/(workouts)/all">Go to Workout</Link>
		</View>
	);
};

export default index;
