import React, { ReactNode } from "react";
import { Text } from "react-native";

const RegularText = ({
	children,
	classNames,
}: {
	children: ReactNode;
	classNames?: string;
}) => {
	return (
		<Text style={{ fontFamily: "Poppins-Regular" }} className={classNames}>
			{children}
		</Text>
	);
};

export default RegularText;
