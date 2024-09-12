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

const SetItem = ({
	index,
	set,
	exerciseName,
	onUpdateSet,
	onDeleteSet,
}: {
	index: number;
	set: IExerciseSet;
	exerciseName: string;
	onUpdateSet: (
		exerciseName: string,
		index: number,
		weight: number,
		reps: number
	) => void;
	onDeleteSet: (exerciseName: string, index: number) => void;
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
						onDeleteSet(exerciseName, index);
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
	const [reps, setReps] = useState(set.repCount);

	return (
		<Animated.View
			style={{ transform: [{ translateX }] }}
			{...panResponder.panHandlers}
			key={index}
			className="flex-row justify-between mb-2"
		>
			<RegularText className="flex-1 text-center">Set {index + 1}</RegularText>
			<TextInput
				className="flex-1 text-center border rounded-md px-2"
				value={String(weight)}
				onChangeText={text => setWeight(Number(text))}
				keyboardType="numeric"
			/>
			<TextInput
				className="flex-1 text-center border rounded-md px-2"
				value={String(reps)}
				onChangeText={text => setReps(Number(text))}
				keyboardType="numeric"
			/>
			<Button
				title="U"
				onPress={() => {
					onUpdateSet(exerciseName, index, weight, reps);
				}}
			/>
		</Animated.View>
	);
};

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
	onAddSet: (exerciseName: string) => void;
	onUpdateSet: (
		exerciseName: string,
		index: number,
		weight: number,
		reps: number
	) => void;
	onDeleteSet: (exerciseName: string, index: number) => void;
}) => {
	const router = useRouter();

	const handleInfoPress = () => {
		router.push(`/exercises/${workoutExercise.exercise.id}`);
		stopTimer();
	};

	return (
		<View className="border-b-2 border-dark-black">
			<View className="flex-row justify-between items-center">
				<BoldText>{workoutExercise.exercise.name}</BoldText>
				<TouchableOpacity onPress={handleInfoPress}>
					<AntDesign name="infocirlce" size={16} color="black" />
				</TouchableOpacity>
			</View>
			<View>
				<View className="flex-row justify-between mb-2">
					<BoldText className="flex-1 text-center">#</BoldText>
					<BoldText className="flex-1 text-center">Weight in kg</BoldText>
					<BoldText className="flex-1 text-center">Reps</BoldText>
					<View className="w-10" />
				</View>
			</View>
			{sets.map((set, index) => (
				<SetItem
					key={index}
					index={index}
					set={set}
					exerciseName={workoutExercise.exercise.name}
					onUpdateSet={onUpdateSet}
					onDeleteSet={onDeleteSet}
				/>
			))}
			<Button
				title="Add set"
				onPress={() => onAddSet(workoutExercise.exercise.name)}
			/>
		</View>
	);
};

export default ActiveWorkoutExercise;
