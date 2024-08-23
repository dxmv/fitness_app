import React, { useState } from "react";
import RegularText from "../../components/text/RegularText";
import { Button, View } from "react-native";
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

const Login = () => {
	// form data
	const [username, setUsername] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});
	const [password, setPassword] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});

	const handleSubmit = async () => {
		try {
			const data = {
				username: username.value,
				password: password.value,
			};

			const res = await authApi.login(data);
			// store the token
			await secureStorage.storeToken(res.jwt);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{/* Image */}
			<View className="bg-white mt-60 h-full rounded-t-3xl py-4 px-8">
				<BoldText className="text-red-500 mb-3 ">Welcome back</BoldText>
				{/* Username field */}
				<CustomTextInput
					value={username.value}
					errorText={username.errorMessage}
					label="Username:"
					onChangeText={text => handleUsernameChange(text, setUsername)}
				/>
				{/* Password field */}
				<CustomTextInput
					value={password.value}
					errorText={password.errorMessage}
					label="Password:"
					onChangeText={text => handlePasswordChange(text, setPassword)}
				/>
				<LightText className="text-right text-sm my-3">Need help?</LightText>
				<Button title="Log In" onPress={handleSubmit} />
				<RegularText>- OR -</RegularText>
				<RegularText>Create an account</RegularText>
			</View>
		</>
	);
};

export default Login;
