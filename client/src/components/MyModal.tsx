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
			<View className="flex-1 justify-end bg-black bg-opacity-50">
				<View className="bg-white rounded-t-3xl p-6">
					<View className="flex-row justify-between items-center mb-4">
						<BoldText className="text-xl">{title}</BoldText>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color="black" />
						</TouchableOpacity>
					</View>
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default ReusableModal;
