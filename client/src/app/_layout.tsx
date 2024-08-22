import { Text, StatusBar } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";

const _layout = () => {
	const [fontsLoaded] = useFonts({
		"Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
	});

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}
	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar backgroundColor="transparent" translucent={false} />
			<Slot />
		</SafeAreaView>
	);
};

export default _layout;
