import { View, Text } from "react-native";
import React from "react";
import "expo-router/entry";
import { Link } from "expo-router";

const index = () => {
	return (
		<View>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Login</Link>
			<Link href="/(auth)/login">Go to Login</Link>
		</View>
	);
};

export default index;
