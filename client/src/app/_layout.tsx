import { StatusBar, Platform } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import ProtectedRoutes from "../components/ProtectedRoutes";
import BottomNavigation from "../components/BottomNavigation";
import Loading from "../components/Loading";

const _layout = () => {
	const [fontsLoaded] = useFonts({
		"Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
	});

	if (!fontsLoaded) {
		return <Loading />;
	}
	// render all components within a safe area
	return (
		<ProtectedRoutes>
			<SafeAreaView
				className="flex-1 bg-dark-black"
				style={{
					paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
				}}
			>
				<Stack screenOptions={{ headerShown: false }} />
			</SafeAreaView>
			<BottomNavigation />
		</ProtectedRoutes>
	);
};

export default _layout;
