import React, { ReactNode } from "react";
import { Text } from "react-native";

const LightText = ({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) => {
	return (
		<Text style={{ fontFamily: "Poppins-Light" }} className={className}>
			{children}
		</Text>
	);
};

export default LightText;
