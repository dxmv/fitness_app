import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

const RegularText = ({ children, className, ...props }: TextProps) => {
	return (
		<Text
			style={{ fontFamily: "Poppins-Regular" }}
			className={className}
			{...props}
		>
			{children}
		</Text>
	);
};

export default RegularText;
