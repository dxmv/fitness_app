import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import RegularText from "./text/RegularText";

interface DropdownProps {
	options: { label: string; onPress: () => void }[]; // Array of options with label and onPress function
}

// Dropdown component definition
const Dropdown: React.FC<DropdownProps> = ({ options }) => {
	const [isVisible, setIsVisible] = useState(false); // State to manage dropdown visibility

	// Function to toggle the dropdown visibility
	const toggleDropdown = () => setIsVisible(!isVisible);

	return (
		<View className="flex flex-row justify-end items-end w-full">
			{/* Button to open the dropdown */}
			<TouchableOpacity onPress={toggleDropdown} className="p-2 ">
				<Feather name="more-vertical" size={24} color="white" />
			</TouchableOpacity>

			{/* Modal for dropdown options */}
			<Modal
				visible={isVisible}
				transparent={true} // Make the modal background transparent
				animationType="fade" // Fade animation for the modal
				onRequestClose={toggleDropdown} // Handle back button press on Android
			>
				<TouchableOpacity
					style={{ flex: 1 }} // Fill the entire screen
					activeOpacity={1} // Prevents the modal from closing when tapping inside
					onPress={toggleDropdown} // Close the dropdown when tapping outside
				>
					<View className="absolute right-2 top-14 bg-light-gray rounded-lg p-1 shadow-md">
						{/* Map through options to create dropdown items */}
						{options.map((option, index) => (
							<TouchableOpacity
								key={index} // Unique key for each option
								className={`p-3 ${
									index < options.length - 1 ? "border-b border-gray-200" : ""
								}`}
								onPress={() => {
									option.onPress(); // Call the onPress function for the selected option
									toggleDropdown(); // Close the dropdown after selection
								}}
							>
								<RegularText className="text-sm">{option.label}</RegularText>
							</TouchableOpacity>
						))}
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

export default Dropdown;
