import { View } from "react-native";
import React, { useState } from "react";
import ReusableModal from "../MyModal";
import CustomTextInput from "../CustomTextInput";
import PrimaryButton from "../buttons/PrimaryButton";

// EditNameModal component allows users to edit the name of an item and save the changes
const EditNameModal = ({
	isVisible,
	itemId,
	originalItemName,
	itemLabel = "Item Name",
	updateItemApi,
	onClose,
}: {
	isVisible: boolean;
	itemId: number;
	originalItemName: string;
	itemLabel?: string;
	updateItemApi: (id: number, name: string) => Promise<void>;
	onClose: () => void;
}) => {
	// State to manage the name of the item being edited
	const [itemName, setItemName] = useState<string>(originalItemName);

	// Function to handle the save action
	const handleSave = async () => {
		// Save the new name
		try {
			await updateItemApi(itemId, itemName);
		} catch (e) {
			console.log(e);
		}
		// Close the modal after saving
		onClose();
	};

	return (
		<ReusableModal isVisible={isVisible} onClose={onClose} title={"Edit name"}>
			<View>
				{/* Custom text input for the item name */}
				<CustomTextInput
					label={itemLabel}
					value={itemName}
					onChangeText={setItemName}
					placeholder={itemLabel}
				/>
				{/* Primary button to save the changes */}
				<PrimaryButton title="Save" onPress={handleSave} />
			</View>
		</ReusableModal>
	);
};

export default EditNameModal;
