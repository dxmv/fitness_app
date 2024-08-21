import React, { ReactNode } from "react";
import { Text } from "react-native";

const BoldText = ({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) => {
	return (
		<Text className={className} style={{ fontFamily: "Poppins-Bold" }}>
			{children}
		</Text>
	);
};

export default BoldText;
