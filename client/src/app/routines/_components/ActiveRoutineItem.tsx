import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import RegularText from "../../../components/text/RegularText";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import RightSwipeWrapper from "../../../components/wrappers/RightSwipeWrapper";
import { IRoutine } from "../../../types";
import routinesApi from "../../../api/routines/routinesApi";

const ActiveRoutineItem = ({ item }: { item: IRoutine }) => {
	const handleDeactivateRoutine = async () => {
		await routinesApi.deactivateRoutine();
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
						params: { isActive: 1 },
					});
				}}
				className="flex-row justify-between items-center p-4 rounded-lg bg-dark-purple shadow-md"
			>
				<View className="flex-1">
					<RegularText className="text-white text-lg font-semibold">
						{item.name}
					</RegularText>
					<RegularText className="text-light-purple text-xs mt-1">
						Active Routine
					</RegularText>
				</View>
				<SecondaryButton
					title="Deactivate"
					onPress={handleDeactivateRoutine}
					className="bg-light-purple"
				/>
			</TouchableOpacity>
		</RightSwipeWrapper>
	);
};

export default ActiveRoutineItem;
