import React, { useState } from "react";
import RegularText from "../../components/text/RegularText";
import { View } from "react-native";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import CustomTextInput from "../../components/CustomTextInput";
import { ITextInput } from "../../types";
import {
	handleUsernameChange,
	handlePasswordChange,
} from "../../utils/handleAuth";
import authApi from "../../api/authApi";
import secureStorage from "../../utils/secureStorage";
import CustomLink from "../../components/buttons/CustomLink";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { router } from "expo-router";

const Login = () => {
	// State to manage form data for username and password
	const [username, setUsername] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [password, setPassword] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [formError, setFormError] = useState<string>(""); // State to manage form error messages

	// Function to handle form submission
	const handleSubmit = async () => {
		try {
			const data = {
				username: username.value,
				password: password.value,
			};

			const res = await authApi.login(data);
			// Store the token securely
			await secureStorage.storeToken(res.jwt);
			// Redirect to the home page upon successful login
			router.push("/");
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
			{/* Main container for the login form */}
			<View className=" bg-dark-black mt-60 h-full rounded-t-3xl py-4 px-8 shadow">
				{/* Welcome message */}
				<BoldText className="text-2xl text-center mb-5 text-light-purple">
					Welcome back
				</BoldText>
				{/* Display form error if exists */}
				{formError && (
					<LightText className="text-primary-pink text-center mb-2">
						{formError}
					</LightText>
				)}
				{/* Input fields */}
				<CustomTextInput
					value={username.value}
					errorText={username.errorMessage}
					label="Username:"
					onChangeText={text => handleUsernameChange(text, setUsername)}
				/>
				<CustomTextInput
					value={password.value}
					errorText={password.errorMessage}
					label="Password:"
					onChangeText={text => handlePasswordChange(text, setPassword)}
					password={true}
				/>
				<LightText className="text-right text-sm mb-6 text-light-gray">
					Forgot your password?
				</LightText>
				<PrimaryButton title="Log In" onPress={handleSubmit} />
				<CustomLink href="/(auth)/register" className="mt-4">
					<RegularText className="text-dark-purple text-center">
						Create an account
					</RegularText>
				</CustomLink>
			</View>
		</>
	);
};

export default Login;
