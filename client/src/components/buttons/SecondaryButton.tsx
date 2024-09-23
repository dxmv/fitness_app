import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface SecondaryButtonProps extends TouchableOpacityProps {
	title: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	title,
	onPress,
	...props
}) => {
	return (
		<TouchableOpacity
			className="bg-light-purple p-4 rounded-lg shadow-md active:bg-dark-purple transition-colors duration-200 ease-in-out"
			onPress={onPress}
			{...props}
		>
			<Text className="text-dark-black font-bold text-center">{title}</Text>
		</TouchableOpacity>
	);
};

export default SecondaryButton;
