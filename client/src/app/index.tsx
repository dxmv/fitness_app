import { View } from "react-native";
import React from "react";
import "expo-router/entry";
import { Link } from "expo-router";

const index = () => {
	return (
		<View>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Register</Link>
			<Link href="/(user)/profile">Go to User Profile</Link>
			<Link href="/exercises/1">Go to Exercise</Link>
		</View>
	);
};

export default index;
