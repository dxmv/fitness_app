import React, { ReactNode } from "react";
import { Text } from "react-native";

const RegularText = ({
	children,
	className,
}: {
	className?: string;
	children: ReactNode;
}) => {
	return (
		<Text style={{ fontFamily: "Poppins-Regular" }} className={className}>
			{children}
		</Text>
	);
};

export default RegularText;
