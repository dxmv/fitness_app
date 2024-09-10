import {
	View,
	Button,
	TouchableOpacity,
	TextInput,
	Animated,
	PanResponder,
	GestureResponderEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import BoldText from "../../../components/text/BoldText";
import LightText from "../../../components/text/LightText";
import { IWorkout, IWorkoutExercise } from "../../../types";
import RegularText from "../../../components/text/RegularText";

interface ISet {
	weight: number;
	reps: number;
}

const ActiveWorkoutScreen = () => {
	const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null);
	const [sets, setSets] = useState<{ [key: string]: Array<ISet> }>({});
	const { workout } = useLocalSearchParams();

	useEffect(() => {
		const getWorkout = async () => {
			if (workout) {
				await setActiveWorkout(JSON.parse(workout as string) as IWorkout);
				// adding the sets to the state
				for (const exercise of activeWorkout?.workoutExercises || []) {
					await setSets(prevSets => {
						return {
							...prevSets,
							[exercise.exercise.name]: [],
						};
					});
				}
			}
		};
		getWorkout();
	}, [workout]);

	// Function to add a new set for a specific exercise
	const addSet = (exerciseName: string) => {
		setSets(prevSets => {
			const newSet: ISet = { weight: 0, reps: 0 }; // Initialize with default values
			return {
				...prevSets,
				[exerciseName]: prevSets[exerciseName]
					? [...prevSets[exerciseName], newSet]
					: [newSet],
			};
		});
	};

	// Function to update an existing set for a specific exercise
	const updateSet = (
		exerciseName: string,
		index: number,
		weight: number,
		reps: number
	) => {
		setSets(prevSets => {
			const updatedSets = [...prevSets[exerciseName]];
			updatedSets[index] = { weight, reps };
			return {
				...prevSets,
				[exerciseName]: updatedSets,
			};
		});
	};

	// Function to delete a specific set for an exercise
	const deleteSet = (exerciseName: string, index: number) => {
		setSets(prevSets => {
			const updatedSets = [...prevSets[exerciseName]];
			updatedSets.splice(index, 1);
			return {
				...prevSets,
				[exerciseName]: updatedSets,
			};
		});
	};

	if (!activeWorkout) {
		return <LightText>Loading...</LightText>;
	}

	return (
		<View className="flex-1 bg-light-gray p-4">
			{/* Workout header */}
			<View className="flex-row justify-between items-center mb-4 border-b-2 border-dark-black">
				<BoldText className="text-3xl text-gray-800">
					{activeWorkout.name}
				</BoldText>
				<RegularText>Rest timer</RegularText>
			</View>
			{activeWorkout.workoutExercises.map((element, index) => (
				<WorkoutItemSkeleton
					workoutExercise={element}
					key={index}
					onAddSet={addSet}
					onUpdateSet={updateSet}
					onDeleteSet={deleteSet}
					sets={sets[element.exercise.name] || []}
				/>
			))}
		</View>
	);
};

const SetItem = ({
	index,
	set,
	exerciseName,
	onUpdateSet,
	onDeleteSet,
}: {
	index: number;
	set: ISet;
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
	const panResponder = React.useRef(
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
	const [reps, setReps] = useState(set.reps);

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

const WorkoutItemSkeleton = ({
	workoutExercise,
	onAddSet,
	onUpdateSet,
	onDeleteSet,
	sets,
}: {
	workoutExercise: IWorkoutExercise;
	onAddSet: (exerciseName: string) => void;
	onUpdateSet: (
		exerciseName: string,
		index: number,
		weight: number,
		reps: number
	) => void;
	onDeleteSet: (exerciseName: string, index: number) => void;
	sets: ISet[];
}) => {
	return (
		<View className="border-b-2 border-dark-black">
			<BoldText>{workoutExercise.exercise.name}</BoldText>
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

export default ActiveWorkoutScreen;
