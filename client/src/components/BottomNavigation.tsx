import { TouchableOpacity, View, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, usePathname, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = () => {
	const pathname = usePathname();
	const segments = useSegments();
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		// Add listener for keyboard show event
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // Set state to true when keyboard is shown
			}
		);
		// Add listener for keyboard hide event
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // Set state to false when keyboard is hidden
			}
		);

		// Cleanup function to remove listeners
		return () => {
			keyboardDidHideListener.remove(); // Remove hide listener
			keyboardDidShowListener.remove(); // Remove show listener
		};
	}, []);

	// Don't show bottom nav on auth screens, exercise screens or when keyboard is visible
	if (
		segments[0] === "(auth)" ||
		segments[0] === "exercises" ||
		isKeyboardVisible
	) {
		return null;
	}

	const navItems = [
		{ name: "/", icon: "home" },
		{ name: "/(workouts)/", icon: "fitness" },
		{ name: "/(routines)/", icon: "fitness" },
		{ name: "/(user)/profile", icon: "person" },
	];

	return (
		<View className="flex-row justify-around items-center bg-dark-black rounded-full mx-4 mb-8 py-3 shadow-lg">
			{navItems.map(item => (
				<Link
					key={item.name}
					href={`${item.name}`}
					asChild
					style={{ width: `${100 / navItems.length}%` }}
				>
					<TouchableOpacity className="items-center">
						<Ionicons
							name={item.icon}
							size={24}
							color={pathname === `${item.name}` ? "#FF4081" : "#7B1FA2"}
						/>
					</TouchableOpacity>
				</Link>
			))}
		</View>
	);
};

export default BottomNavigation;
