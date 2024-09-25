import { Image, ImageProps, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ReusableModal from "./MyModal";
import BoldText from "./text/BoldText";
import CustomImagePicker from "./CustomImagePicker";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import userApi from "../api/user/userApi";

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
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleImagePress = () => {
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<TouchableOpacity onPress={handleImagePress}>
				<Image
					source={{ uri: image }}
					style={{ width, height }}
					className={`${className} rounded-full shadow-lg shadow-black`}
				/>
			</TouchableOpacity>
			<EditImageModal
				isVisible={isModalVisible}
				onClose={handleCloseModal}
				currentImage={image}
			/>
		</>
	);
};

const EditImageModal = ({
	isVisible,
	onClose,
	currentImage,
}: {
	isVisible: boolean;
	onClose: () => void;
	currentImage: string;
}) => {
	const [image, setImage] = useState<string | null>(currentImage);

	const handleSave = async () => {
		const formData = new FormData();
		if (!image) return;
		// Extract the file extension from the image URI
		const uriParts = image.split(".");
		const fileType = uriParts[uriParts.length - 1];

		// Append the image with appropriate URI, name, and type to the formData
		formData.append("profilePicture", {
			uri: Platform.OS === "android" ? image : image.replace("file://", ""),
			name: `photo.${fileType}`,
			type: `image/${fileType}`,
		} as any);

		const user = await userApi.updateProfilePicture(formData);
		console.log(user);
		onClose();
	};

	return (
		<ReusableModal
			isVisible={isVisible}
			onClose={onClose}
			title={"Edit your image"}
		>
			<BoldText className="text-center text-light-gray text-lg ">
				Upload Profile Picture
			</BoldText>
			<Image
				source={{ uri: image ?? "" }}
				className="w-32 h-32 rounded-full my-2 mx-auto border-2 border-white"
			/>
			<CustomImagePicker image={image} setImage={setImage} />
			<PrimaryButton title="Save" onPress={handleSave} className="mb-4 mt-8" />
			<SecondaryButton title="Back" onPress={onClose} />
		</ReusableModal>
	);
};

export default CustomAvatar;
