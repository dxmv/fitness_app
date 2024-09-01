import React from "react";
import { View } from "react-native";
import { Slot, useRouter } from "expo-router";
import useAuth from "../../hooks/auth/useAuth";

const AuthLayout = () => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		router.replace("/(user)/profile");
	}

	return (
		<View className="w-full h-full bg-purple-600">
			<Slot />
		</View>
	);
};

export default AuthLayout;
