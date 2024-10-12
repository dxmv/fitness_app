import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import RegularText from "../../../components/text/RegularText";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import RightSwipeWrapper from "../../../components/wrappers/RightSwipeWrapper";
import { IRoutine } from "../../../types";
import routinesApi from "../../../api/routines/routinesApi";

const InactiveRoutineItem = ({ item }: { item: IRoutine }) => {
	const handleActivateRoutine = async () => {
		await routinesApi.activateRoutine(item.id);
	};

	return (
		<RightSwipeWrapper
			onRightSwipe={() => {
				console.log("delete");
			}}
		>
			<TouchableOpacity
				onPress={() => {
					router.push({
						pathname: `/routines/details/${item.id}`,
						params: { isActive: 0 },
					});
				}}
				className="flex-row justify-between items-center p-4 rounded-lg bg-light-purple shadow-md"
			>
				<View className="flex-1">
					<RegularText className="text-dark-purple text-lg font-semibold">
						{item.name}
					</RegularText>
					<RegularText className="text-secondary-purple text-xs mt-1">
						Tap to view details
					</RegularText>
				</View>
				<PrimaryButton title="Activate" onPress={handleActivateRoutine} />
			</TouchableOpacity>
		</RightSwipeWrapper>
	);
};

export default InactiveRoutineItem;
