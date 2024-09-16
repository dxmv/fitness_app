import { View, Button, Image } from "react-native";
import React, { SetStateAction } from "react";
import * as ImagePicker from "expo-image-picker";

const CustomImagePicker = ({
	image,
	setImage,
}: {
	image: string | null;
	setImage: React.Dispatch<SetStateAction<string | null>>;
}) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Button title="Pick an image from camera roll" onPress={pickImage} />
		</View>
	);
};

export default CustomImagePicker;