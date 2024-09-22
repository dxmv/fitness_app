import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import RegularText from "./text/RegularText";
import LightText from "./text/LightText";

interface CustomTextInputProps extends TextInputProps {
	label: string;
	errorText?: string;
	password?: boolean;
}

const CustomTextInput = ({
	password,
	label,
	errorText,
	value,
	onChangeText,
	...props
}: CustomTextInputProps) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	return (
		<View className="mb-4">
			<RegularText
				className={`
					text-sm font-medium mb-1
					${isFocused ? "text-secondary-purple" : "text-light-gray"}
				`}
			>
				{label}
			</RegularText>
			<TextInput
				secureTextEntry={password}
				value={value}
				onChangeText={onChangeText}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`
					border rounded-md px-3 py-2 mb-1
					${
						isFocused
							? "border-secondary-purple focus:ring-2 focus:ring-light-purple"
							: errorText
							? "border-primary-pink"
							: "border-light-gray"
					}
					${errorText ? "bg-light-pink" : "bg-light-gray"}
					text-dark-black
				`}
				{...props}
			/>
			{errorText && (
				<LightText className="text-xs text-primary-pink mt-1">
					{errorText}
				</LightText>
			)}
		</View>
	);
};

export default CustomTextInput;
