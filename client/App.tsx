import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";
import Login from "./src/screens/auth/Login";
import { useFonts } from "expo-font";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
		"Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
	});

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}
	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar backgroundColor="transparent" translucent={false} />
			<Login />
		</SafeAreaView>
	);
}
