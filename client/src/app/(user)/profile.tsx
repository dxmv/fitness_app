import { TouchableOpacity, View } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { ITextInput, IUser } from "../../types";
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
import ReusableModal from "../../components/MyModal";
import CustomTextInput from "../../components/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {
	handleEmailChange,
	handleUsernameChange,
} from "../../utils/handleAuth";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const profile = () => {
	// State to store user data
	const [user, setUser] = useState<IUser | null>(null);
	const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

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

	const handleEdit = () => {
		setIsEditModalVisible(true);
	};

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
			<EditUserModal
				isVisible={isEditModalVisible}
				onClose={() => setIsEditModalVisible(false)}
				user={user}
			/>
		</LinearGradientWrapper>
	);
};

const EditUserModal = ({
	isVisible,
	onClose,
	user,
}: {
	isVisible: boolean;
	onClose: () => void;
	user: IUser;
}) => {
	const [username, setUsername] = useState<ITextInput>({
		value: user.username,
		errorMessage: "",
	});
	const [email, setEmail] = useState<ITextInput>({
		value: user.email,
		errorMessage: "",
	});
	const [formError, setFormError] = useState<string>("");

	const handleSave = async () => {
		try {
			const res = await userApi.updateUser(username.value, email.value);
			onClose(); // close the modal when done
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
		<ReusableModal isVisible={isVisible} onClose={onClose} title="Edit Profile">
			{/* Display form error if exists */}
			{formError && (
				<LightText className="text-primary-pink text-center mb-2">
					{formError}
				</LightText>
			)}
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
			<PrimaryButton title="Save" onPress={handleSave} className="mt-6" />
			<SecondaryButton title="Cancel" onPress={onClose} className="mt-6" />
		</ReusableModal>
	);
};

export default profile;
