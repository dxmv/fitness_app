import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types";
import userApi from "../../api/userApi";
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import secureStorage from "../../utils/secureStorage";
import LightText from "../../components/text/LightText";
import CustomAvatar from "../../components/CustomAvatar";

const profile = () => {
	// State to store user data
	const [user, setUser] = useState<IUser | null>(null);

	// Fetch the current user data when the component mounts
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await userApi.getCurrent();
				setUser(userData);
			} catch (error) {
				console.error("Failed to fetch user data", error);
			}
		};
		fetchUser();
	}, []);

	// If user data is still loading, you can display a loading indicator or message
	if (!user) {
		return (
			<View>
				<RegularText>Loading...</RegularText>
			</View>
		);
	}

	return (
		<View className="flex flex-col items-center w-full h-full mt-3">
			{/* Three dots for editing the user & logging out */}
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
			{/* Last week activities */}
			{/* Recent workouts */}
			{/* Favorite exercises */}
		</View>
	);
};

export default profile;
