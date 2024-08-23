import React from "react";
import { Text, TextProps } from "react-native";

const BoldText = ({ children, className, ...props }: TextProps) => {
	return (
		<Text
			className={`${className} font-bold`}
			style={{ fontFamily: "Poppins-Bold" }}
			{...props}
		>
			{children}
		</Text>
	);
};

export default BoldText;
