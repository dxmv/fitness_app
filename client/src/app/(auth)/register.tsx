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
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CustomLink from "../../components/buttons/CustomLink";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import LightText from "../../components/text/LightText";

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
	// password and confirm password stage
	const [password, setPassword] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [confirmPassword, setConfirmPassword] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});

	const [formError, setFormError] = useState<string>("");

	// State for stage 2 (image upload)
	const [image, setImage] = useState<string | null>(null);

	const handleBackStage = () => setStage(prev => prev - 1);

	// Function to handle moving to the next stage
	const handleNextStage = () => {
		if (stage === 1) {
			// check that there are no errors
			if (username.errorMessage !== "" || email.errorMessage !== "") {
				return;
			}
			// check if the fields are empty
			if (username.value === "") {
				setUsername(prev => ({
					...prev,
					errorMessage: "The username is required",
				}));
				return;
			}
			if (email.value === "") {
				setEmail(prev => ({ ...prev, errorMessage: "The email is required" }));
				return;
			}

			setStage(prev => prev + 1);
		} else if (stage === 2) {
			// check that there are no errors
			if (password.errorMessage !== "" || confirmPassword.errorMessage !== "") {
				return;
			}
			// check if the fields are empty
			if (password.value === "") {
				setPassword(prev => ({
					...prev,
					errorMessage: "The password is required",
				}));
				return;
			}
			if (confirmPassword.value === "") {
				setConfirmPassword(prev => ({
					...prev,
					errorMessage: "You must confirm your password",
				}));
				return;
			}
			// check if the password and confirm password fields match
			if (password.value !== confirmPassword.value) {
				setFormError("The password and confirm password fields do not match");
				return;
			}

			setStage(prev => prev + 1);
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

			// Send the formData to the API using a POST request
			const data = await authApi.register(formData);
			// Handle successful registration (e.g., navigate to the login screen)
		} catch (e) {
			// Handle errors during login
			if (typeof e === "object" && e !== null && "message" in e) {
				setFormError(e.message as string); // Set form error message if available
			} else {
				setFormError("An unexpected error occurred"); // Fallback error message
			}
		}
	};

	return (
		<>
			{/* Image */}
			<View className=" bg-dark-black mt-60 h-full rounded-t-3xl py-4 px-8 shadow">
				<BoldText className="text-2xl text-center mb-5 text-light-purple">
					Create an account
				</BoldText>
				{/* Display form error if exists */}
				{formError && (
					<LightText className="text-primary-pink text-center mb-2">
						{formError}
					</LightText>
				)}
				{stage === 1 ? (
					// Stage 1: Username and email
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
						<PrimaryButton
							title="Next"
							onPress={handleNextStage}
							className="mt-6"
						/>
					</>
				) : stage === 2 ? (
					// Stage 2: Password and confirm password
					<>
						{/* Password field */}
						<CustomTextInput
							value={password.value}
							errorText={password.errorMessage}
							label="Password:"
							onChangeText={text => handlePasswordChange(text, setPassword)}
						/>
						{/* Confirm Password field */}
						<CustomTextInput
							value={confirmPassword.value}
							errorText={confirmPassword.errorMessage}
							label="Confirm Password:"
							onChangeText={text =>
								handlePasswordChange(text, setConfirmPassword)
							}
						/>
						<PrimaryButton
							title="Next"
							onPress={handleNextStage}
							className="mt-6"
						/>
						<SecondaryButton
							title="Back"
							onPress={handleBackStage}
							className="mt-4"
						/>
					</>
				) : (
					// Stage 3: Image upload
					<>
						<BoldText className="text-center text-light-gray text-lg ">
							Upload Profile Picture
						</BoldText>
						<Image
							source={{ uri: image ?? "" }}
							className="w-32 h-32 rounded-full my-2 mx-auto border-2 border-white"
						/>
						<CustomImagePicker image={image} setImage={setImage} />
						<PrimaryButton
							title="Register"
							onPress={handleRegister}
							className="mb-4 mt-8"
						/>
						<SecondaryButton title="Back" onPress={handleBackStage} />
					</>
				)}
				<CustomLink href="/(auth)/register" className="mt-4">
					<RegularText className="text-dark-purple text-center">
						Already have an account?
					</RegularText>
				</CustomLink>
			</View>
		</>
	);
};

export default Register;
