import React, { useEffect, useState } from "react";
import { View } from "react-native";
import secureStorage from "../../utils/secureStorage";
import { Slot, useRouter } from "expo-router";

const AuthLayout = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await secureStorage.getToken();
				if (token) {
					// User is logged in, redirect to home
					router.replace("/(user)/profile");
				}
			} catch (error) {
				console.error("Error checking token:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkToken();
	}, []);

	if (isLoading) {
		return <View className="flex-1 items-center justify-center bg-white" />;
	}
	return (
		<View className="w-full h-full bg-purple-600">
			<Slot />
		</View>
	);
};

export default AuthLayout;
