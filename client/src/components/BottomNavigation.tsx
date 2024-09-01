import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = () => {
	const pathname = usePathname();

	const navItems = [
		{ name: "/index", icon: "home" },
		{ name: "workouts/2", icon: "fitness" },
		{ name: "exercises/1", icon: "fitness" },
		{ name: "/(user)/profile", icon: "person" },
	];

	return (
		<View className="flex-row justify-around items-center bg-dark-black rounded-full mx-4 mb-8 py-3 shadow-lg">
			{navItems.map(item => (
				<Link
					key={item.name}
					href={`/${item.name}`}
					asChild
					style={{ width: `${100 / navItems.length}%` }}
				>
					<TouchableOpacity className="items-center">
						<Ionicons
							name={item.icon}
							size={24}
							color={pathname === `/${item.name}` ? "#FF4081" : "#7B1FA2"}
						/>
					</TouchableOpacity>
				</Link>
			))}
		</View>
	);
};

export default BottomNavigation;
