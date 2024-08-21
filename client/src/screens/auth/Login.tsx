import React, { useState } from "react";
import RegularText from "../../components/text/RegularText";
import { Button, TextInput, View } from "react-native";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import CustomTextInput from "../../components/CustomTextInput";

const Login = () => {
	const [email, setEmail] = useState<string>("N");
	const [password, setPassword] = useState<string>("N");

	const handleEmailChange = (text: string) => {
		setEmail(text);
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
	};

	return (
		<View className="w-full h-full bg-purple-600">
			{/* Image */}
			<View className="bg-white mt-60 h-full rounded-t-3xl py-4 px-8">
				<BoldText className="text-red-500 mb-3 ">Welcome back</BoldText>
				{/* Email field */}
				<CustomTextInput
					value={email}
					label="Email:"
					onChangeText={handleEmailChange}
				/>
				{/* Password field */}
				<CustomTextInput
					value={password}
					label="Password:"
					onChangeText={handlePasswordChange}
				/>
				<LightText className="text-right text-sm my-3">Need help?</LightText>
				<Button title="Log In" />
				<RegularText>- OR -</RegularText>
				<RegularText>Create an account</RegularText>
			</View>
		</View>
	);
};

export default Login;
