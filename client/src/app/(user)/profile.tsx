import { TouchableOpacity, View } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { IUser } from "../../types";
import userApi from "../../api/userApi";
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import LightText from "../../components/text/LightText";
import CustomAvatar from "../../components/CustomAvatar";
import Feather from "@expo/vector-icons/Feather";
import secureStorage from "../../utils/secureStorage";
import Loading from "../../components/Loading";

const profile = () => {
	// State to store user data
	const [user, setUser] = useState<IUser | null>(null);
	// the dropdown visibility
	const [isVisible, setIsVisible] = useState<boolean>(false);

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

	const toggleDropdown = () => setIsVisible(prev => !prev);

	if (!user) {
		return <Loading />;
	}

	return (
		<View className="flex flex-col items-center w-full h-full mt-3">
			<DropdownMenu
				isVisible={isVisible}
				toggleDropdown={toggleDropdown}
				setUser={setUser}
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
			{/* Last week activities */}
			{/* Recent workouts */}
			{/* Favorite exercises */}
		</View>
	);
};

const DropdownMenu = ({
	isVisible,
	toggleDropdown,
	setUser,
}: {
	isVisible: boolean;
	toggleDropdown: () => void;
	setUser: React.Dispatch<SetStateAction<IUser | null>>;
}) => {
	const handleEdit = () => {};

	const handleLogout = async () => {
		// delete the current token
		await secureStorage.removeToken();
		// when component re-renders
		setUser(null);
	};
	return (
		<>
			{/* Three dots for editing the user & logging out */}
			<TouchableOpacity onPress={toggleDropdown}>
				<Feather
					name="more-horizontal"
					size={24}
					color="black"
					className="text-right"
				/>
			</TouchableOpacity>
			{/* Dropdown menu */}
			{isVisible && (
				<View className="absolute top-8 right-0 bg-white rounded-md shadow-md">
					<TouchableOpacity
						className="px-4 py-2 border-b border-gray-200"
						onPress={handleEdit}
					>
						<RegularText className="text-gray-800">Edit</RegularText>
					</TouchableOpacity>
					<TouchableOpacity className="px-4 py-2" onPress={handleLogout}>
						<RegularText className="text-gray-800">Logout</RegularText>
					</TouchableOpacity>
				</View>
			)}
		</>
	);
};

export default profile;
