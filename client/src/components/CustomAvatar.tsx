import { Image, ImageProps } from "react-native";
import React from "react";

const CustomAvatar = ({
	image,
	width = 50,
	height = 50,
	className,
}: {
	image: string;
	width?: number;
	height?: number;
} & ImageProps) => {
	return (
		<Image
			source={{
				uri: "http://192.168.1.14:8080/uploads/profile_pictures/f9281919-cdd0-4cb1-9713-7eaefe3a2fcc_photo.jpeg",
			}}
			style={{ width, height }}
			className={`${className} rounded-full shadow-lg shadow-black`}
		/>
	);
};

export default CustomAvatar;
