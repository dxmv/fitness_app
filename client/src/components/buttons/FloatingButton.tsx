import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

// FloatingButton component definition
const FloatingButton = ({
	onPress,
	iconName,
	iconSize = 24,
	iconColor = "white",
	className,
	...props
}: {
	onPress: () => void;
	iconName: string;
	iconSize?: number;
	iconColor?: string;
} & TouchableOpacityProps) => {
	return (
		<TouchableOpacity
			className={`absolute bottom-28 right-5 p-3 rounded-full `}
			onPress={onPress}
			{...props}
		>
			{/* Feather icon inside the button */}
			<Feather
				name={iconName as keyof typeof Feather.glyphMap}
				size={iconSize}
				color={iconColor}
			/>
		</TouchableOpacity>
	);
};

export default FloatingButton;
