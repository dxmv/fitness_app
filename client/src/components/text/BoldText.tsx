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
		<Text style={{ fontFamily: "Poppins-Bold" }} className={className}>
			{children}
		</Text>
	);
};

export default BoldText;
