// This component is a wrapper for the LinearGradient from expo-linear-gradient,
// providing a customizable gradient background with padding and flexible styling.
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

export const LinearGradientWrapper = ({
	className,
	children,
	...props
}: Omit<LinearGradientProps, "colors">) => {
	return (
		<LinearGradient
			colors={["#121212", "#7B1FA2", "#FF4081"]}
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
			style={{ flex: 1 }}
			className={`p-4 ${className} w-full h-full`}
			{...props}
		>
			{children}
		</LinearGradient>
	);
};
