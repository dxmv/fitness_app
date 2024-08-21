import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import RegularText from "./text/RegularText";
import LightText from "./text/LightText";

interface CustomTextInputProps extends TextInputProps {
	label: string;
	errorText?: string;
}

const CustomTextInput = ({
	label,
	errorText,
	value,
	onChangeText,
	...props
}: CustomTextInputProps) => {
	const [isFocused, setIsFocused] = useState<Boolean>(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<View>
			<RegularText
				className={`
					text-sm font-medium mb-1
					${isFocused ? "text-purple-600" : "text-gray-600"}
				`}
			>
				{label}
			</RegularText>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`
					"border rounded-md px-3 py-2 mb-1
					${
						isFocused
							? "border-purple-600 focus:ring-2 focus:ring-purple-600"
							: errorText
							? "border-red-500"
							: "border-gray-300"
					}
				`}
				{...props}
			/>
			{errorText && (
				<LightText className="text-sm text-red-500 mt-1">{errorText}</LightText>
			)}
		</View>
	);
};

export default CustomTextInput;
