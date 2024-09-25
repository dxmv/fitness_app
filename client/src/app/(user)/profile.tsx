import { TouchableOpacity, View } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { IUser } from "../../types";
import userApi from "../../api/user/userApi";
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import CustomAvatar from "../../components/CustomAvatar";
import Feather from "@expo/vector-icons/Feather";
import secureStorage from "../../utils/secureStorage";
import Loading from "../../components/Loading";
import { LinearGradientWrapper } from "../../components/wrappers/LinearGradientWrapper";
import Dropdown from "../../components/Dropdown";

const profile = () => {
	// State to store user data
	const [user, setUser] = useState<IUser | null>(null);

	// Fetch the current user data when the component mounts
	const fetchUser = async () => {
		try {
			const userData = await userApi.getCurrent();
			setUser(userData);
		} catch (e) {
			// Handle errors during login
			if (typeof e === "object" && e !== null && "message" in e) {
				console.log(e.message as string); // Set form error message if available
			} else {
				console.log("An unexpected error occurred"); // Fallback error message
			}
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	if (!user) {
		return <Loading />;
	}

	const handleEdit = () => {};

	const handleLogout = async () => {
		// delete the current token
		await secureStorage.removeToken();
		// when component re-renders
		setUser(null);
	};

	return (
		<LinearGradientWrapper className="flex flex-col items-center p-4">
			<Dropdown
				options={[
					{ label: "Edit", onPress: handleEdit },
					{ label: "Logout", onPress: handleLogout },
				]}
			/>

			{/* Basic info */}
			<CustomAvatar
				image={user.profilePicture}
				width={100}
				height={100}
				className="mb-3"
			/>
			<BoldText className="text-2xl">{user.username}</BoldText>
			<LightText>{user.email}</LightText>
			{/* Number of workouts & routines */}
			<View className="flex flex-row bg-black w-2/3">
				<View>
					<BoldText>Nigga</BoldText>
				</View>
				<View>
					<BoldText>Nigga</BoldText>
				</View>
			</View>
			{/* Recent workouts */}
			{/* Last week activities */}
			{/* Favorite exercises */}
			{/* Number of times that workout has been done */}
			{/* Stats for exercises dropdown */}
		</LinearGradientWrapper>
	);
};

export default profile;
