import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
	title: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	title,
	onPress,
	...props
}) => {
	return (
		<TouchableOpacity
			className={`bg-primary-pink p-4 rounded-lg items-center ${props.className}`}
			onPress={onPress}
			{...props}
		>
			<Text className="text-light-gray font-bold">{title}</Text>
		</TouchableOpacity>
	);
};

export default PrimaryButton;
