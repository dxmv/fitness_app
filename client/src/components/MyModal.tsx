import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import BoldText from "./text/BoldText";

interface MyModalProps {
	isVisible: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const ReusableModal: React.FC<MyModalProps> = ({
	isVisible,
	onClose,
	title,
	children,
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View
				className="flex-1 justify-center items-center "
				style={{ backgroundColor: "rgba(18, 18, 18, 0.7)" }}
			>
				<View className="bg-dark-black rounded-lg p-6 shadow-lg w-11/12 max-w-md border-2 border-primary-pink">
					<View className="flex-row justify-between items-center mb-4">
						<BoldText className="text-primary-pink text-xl">{title}</BoldText>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color="dark-black" />
						</TouchableOpacity>
					</View>
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default ReusableModal;
