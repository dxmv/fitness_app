import {
	Animated,
	Button,
	GestureResponderEvent,
	PanResponder,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import BoldText from "../../../components/text/BoldText";
import { IExerciseSet, IWorkoutExercise } from "../../../types";
import RegularText from "../../../components/text/RegularText";
import { useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

// Component to render each set item
const SetItem = ({
	index,
	set,
	exerciseId,
	onUpdateSet,
	onDeleteSet,
}: {
	index: number;
	set: IExerciseSet;
	exerciseId: number;
	onUpdateSet: (
		exerciseId: number,
		index: number,
		weight: number,
		reps: number
	) => void;
	onDeleteSet: (exerciseId: number, index: number) => void;
}) => {
	const translateX = new Animated.Value(0);
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (
				evt: GestureResponderEvent,
				gestureState
			) => {
				return gestureState.dx > 30; // Detect right swipe
			},
			onPanResponderMove: (evt, gestureState) => {
				translateX.setValue(gestureState.dx);
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx > 100) {
					// If swiped more than 100px, trigger delete
					Animated.timing(translateX, {
						toValue: 500,
						duration: 300,
						useNativeDriver: true,
					}).start(() => {
						onDeleteSet(exerciseId, index);
					});
				} else {
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;
	const [weight, setWeight] = useState(set.weight);
	const [reps, setReps] = useState(set.reps);

	return (
		<Animated.View
			style={{ transform: [{ translateX }] }}
			{...panResponder.panHandlers}
			key={index}
			className="flex-row justify-between items-center mb-2 bg-light-purple rounded-lg p-2"
		>
			<RegularText className="flex-1 text-center text-dark-purple">
				Set {index + 1}
			</RegularText>
			<TextInput
				className="flex-1 text-center border border-secondary-purple rounded-md px-2 py-1 mx-1 text-dark-black"
				value={String(weight)}
				onChangeText={text => setWeight(Number(text))}
				keyboardType="numeric"
			/>
			<TextInput
				className="flex-1 text-center border border-secondary-purple rounded-md px-2 py-1 mx-1 text-dark-black"
				value={String(reps)}
				onChangeText={text => setReps(Number(text))}
				keyboardType="numeric"
			/>
			<TouchableOpacity
				onPress={() => onUpdateSet(exerciseId, index, weight, reps)}
				className="bg-primary-pink rounded-full w-8 h-8 justify-center items-center ml-2"
			>
				<AntDesign name="check" size={16} color="white" />
			</TouchableOpacity>
		</Animated.View>
	);
};

// Component to render the active workout exercise
const ActiveWorkoutExercise = ({
	workoutExercise,
	sets,
	stopTimer,
	onAddSet,
	onUpdateSet,
	onDeleteSet,
}: {
	workoutExercise: IWorkoutExercise;
	sets: IExerciseSet[];
	stopTimer: () => void;
	onAddSet: (exerciseId: number) => void;
	onUpdateSet: (
		exerciseId: number,
		index: number,
		weight: number,
		reps: number
	) => void;
	onDeleteSet: (exerciseId: number, index: number) => void;
}) => {
	const router = useRouter();

	// Function to handle info button press
	const handleInfoPress = () => {
		router.push(`/exercises/${workoutExercise.exercise.id}`);
		stopTimer();
	};

	return (
		<View className="mb-6 bg-light-gray rounded-lg p-4 shadow-md">
			<View className="flex-row justify-between items-center mb-2">
				<BoldText className="text-xl text-dark-purple">
					{workoutExercise.exercise.name}
				</BoldText>
				<TouchableOpacity
					onPress={handleInfoPress}
					className="bg-secondary-purple rounded-full p-2"
				>
					<AntDesign name="infocirlce" size={16} color="white" />
				</TouchableOpacity>
			</View>
			<View>
				<View className="flex-row justify-between mb-2">
					<BoldText className="flex-1 text-center text-secondary-purple">
						#
					</BoldText>
					<BoldText className="flex-1 text-center text-secondary-purple">
						Weight (kg)
					</BoldText>
					<BoldText className="flex-1 text-center text-secondary-purple">
						Reps
					</BoldText>
					<View className="w-10" />
				</View>
			</View>
			{sets.map((set, index) => (
				<SetItem
					key={index}
					index={index}
					set={set}
					exerciseId={workoutExercise.exercise.id}
					onUpdateSet={onUpdateSet}
					onDeleteSet={onDeleteSet}
				/>
			))}
			<TouchableOpacity
				onPress={() => onAddSet(workoutExercise.exercise.id)}
				className="bg-dark-purple rounded-lg py-2 mt-4"
			>
				<BoldText className="text-center text-white">Add Set</BoldText>
			</TouchableOpacity>
		</View>
	);
};

export default ActiveWorkoutExercise;
