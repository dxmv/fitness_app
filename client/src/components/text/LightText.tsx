import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

const LightText = ({ children, className, ...props }: TextProps) => {
	return (
		<Text
			style={{ fontFamily: "Poppins-Light" }}
			className={`${className} font-light`}
			{...props}
		>
			{children}
		</Text>
	);
};

export default LightText;
