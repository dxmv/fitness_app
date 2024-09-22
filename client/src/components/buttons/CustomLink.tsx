import { TouchableOpacity } from "react-native";
import React from "react";
import { Link, LinkProps } from "expo-router";

const CustomLink = ({
	href,
	children,
	className,
	...props
}: { href: string } & LinkProps<string>) => {
	return (
		<TouchableOpacity className="flex justify-center items-center">
			<Link href={href} className={className} {...props}>
				{children}
			</Link>
		</TouchableOpacity>
	);
};

export default CustomLink;
