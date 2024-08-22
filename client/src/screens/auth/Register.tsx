import React, { useState } from "react";
import { Button, View, Image, Platform } from "react-native";
import BoldText from "../../components/text/BoldText";
import CustomTextInput from "../../components/CustomTextInput";
import RegularText from "../../components/text/RegularText";
import { ITextInput } from "../../types";
import {
	handleEmailChange,
	handlePasswordChange,
	handleUsernameChange,
} from "../../utils/handleAuth";
import CustomImagePicker from "../../components/CustomImagePicker";
import authApi from "../../api/authApi";

const Register = () => {
	const [stage, setStage] = useState<number>(1);
	// form data
	const [username, setUsername] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [email, setEmail] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [password, setPassword] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});

	// State for stage 2 (image upload)
	const [image, setImage] = useState<string | null>(null);

	const handleBackStage = () => setStage(1);

	// Function to handle moving to the next stage
	const handleNextStage = () => {
		// Validate stage 1 inputs before moving to stage 2
		if (
			username.value &&
			email.value &&
			password.value &&
			!username.errorMessage &&
			!email.errorMessage &&
			!password.errorMessage
		) {
			setStage(2);
		} else {
			// Show an error message or handle invalid inputs
			console.log("Please fill all fields correctly");
		}
	};

	// Function to handle the final registration
	const handleRegister = async () => {
		try {
			// Create a new FormData object to hold the registration data
			const formData = new FormData();

			// Append the username, email, and password fields to the formData
			formData.append("username", username.value);
			formData.append("email", email.value);
			formData.append("password", password.value);

			// If an image is selected, append it to the formData
			if (image) {
				// Extract the file extension from the image URI
				const uriParts = image.split(".");
				const fileType = uriParts[uriParts.length - 1];

				// Append the image with appropriate URI, name, and type to the formData
				formData.append("image", {
					uri: Platform.OS === "android" ? image : image.replace("file://", ""),
					name: `photo.${fileType}`,
					type: `image/${fileType}`,
				} as any);
			}
			console.log(formData);

			// Send the formData to the API using a POST request
			const data = await authApi.register(formData);
			console.log("Registration successful:", data);
			// Handle successful registration (e.g., navigate to the login screen)
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View className="w-full h-full bg-purple-600">
			{/* Image */}
			<View className="bg-white mt-60 h-full rounded-t-3xl py-4 px-8">
				<BoldText className="text-red-500 mb-3 ">Hello, Get Started</BoldText>
				{stage === 1 ? (
					// Stage 1: Username, Email, and Password inputs
					<>
						{/* Username field */}
						<CustomTextInput
							value={username.value}
							errorText={username.errorMessage}
							label="Username:"
							onChangeText={text => handleUsernameChange(text, setUsername)}
						/>
						{/* Email field */}
						<CustomTextInput
							value={email.value}
							errorText={email.errorMessage}
							label="Email:"
							onChangeText={text => handleEmailChange(text, setEmail)}
						/>
						{/* Password field */}
						<CustomTextInput
							value={password.value}
							errorText={password.errorMessage}
							label="Password:"
							onChangeText={text => handlePasswordChange(text, setPassword)}
						/>
						<Button title="Next" onPress={handleNextStage} />
					</>
				) : (
					// Stage 2: Image upload
					<>
						<BoldText>Upload Profile Picture</BoldText>
						<CustomImagePicker image={image} setImage={setImage} />
						<Button title="Register" onPress={handleRegister} />
						<Button title="Back" onPress={handleBackStage} />
					</>
				)}
				<RegularText>- OR -</RegularText>
				<RegularText>Create an account</RegularText>
			</View>
		</View>
	);
};

export default Register;
