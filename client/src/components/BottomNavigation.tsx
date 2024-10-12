import { TouchableOpacity, View, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, usePathname, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LightText from "./text/LightText";

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
		{ name: "/", icon: "home", activeIcon: "home", label: "Home" },
		{
			name: "/workouts",
			icon: "barbell-outline",
			activeIcon: "barbell",
			label: "Workouts",
		},
		{
			name: "/routines",
			icon: "calendar-outline",
			activeIcon: "calendar",
			label: "Routines",
		},
		{
			name: "/user/profile",
			icon: "person-outline",
			activeIcon: "person",
			label: "Profile",
		},
	];

	console.log(pathname);

	return (
		<View className="w-full h-20 absolute bottom-0 left-0 right-0">
			<View className="flex-row justify-around items-center bg-dark-black h-full rounded-t-md shadow-lg">
				{navItems.map(item => {
					const isActive = pathname === `${item.name}`;
					return (
						<Link key={item.name} href={`${item.name}`} asChild>
							<TouchableOpacity className="items-center justify-center flex-1">
								<Ionicons
									name={
										isActive ? (item.activeIcon as any) : (item.icon as any)
									}
									size={24}
									color={isActive ? "#FF4081" : "#7B1FA2"}
								/>
								<LightText
									className={`text-xs mt-1 ${
										isActive ? "text-pink-500" : "text-purple-500"
									}`}
								>
									{item.label}
								</LightText>
							</TouchableOpacity>
						</Link>
					);
				})}
			</View>
		</View>
	);
};

export default BottomNavigation;
