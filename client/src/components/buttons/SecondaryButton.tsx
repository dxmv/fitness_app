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
			className="bg-black p-4 rounded-lg"
			onPress={onPress}
			{...props}
		>
			<Text className="text-white font-bold text-lg">{title}</Text>
		</TouchableOpacity>
	);
};

export default SecondaryButton;
