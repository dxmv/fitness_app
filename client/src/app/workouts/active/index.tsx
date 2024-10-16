import {
	Button,
	Platform,
	TouchableOpacity,
	Vibration,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import BoldText from "../../../components/text/BoldText";
import { IExerciseSet, IWorkout } from "../../../types";
import RegularText from "../../../components/text/RegularText";
import ActiveWorkoutExercise from "../_components/ActiveWorkoutExercise";
import MyModal from "../../../components/MyModal";
import { showTimer } from "../../../utils/restTimer";
import { LinearGradientWrapper } from "../../../components/wrappers/LinearGradientWrapper";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import Loading from "../../../components/Loading";
import { AntDesign } from "@expo/vector-icons";
const TIMER_CHANGE_INTERVAL = 10;
const DEFAULT_TIMER_DURATION = 2;

// vibration patterns for different platforms
const VIBRATION_PATTERN =
	Platform.OS === "ios" ? [0, 1000, 2000, 3000] : [1000, 2000, 1000, 2000];

const ActiveWorkoutScreen = () => {
	const router = useRouter();

	const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null);
	const [sets, setSets] = useState<{ [key: number]: Array<IExerciseSet> }>({});
	const { workout } = useLocalSearchParams<{ workout: string }>();
	// rest timer
	const [isTimerModalVisible, setIsTimerModalVisible] =
		useState<boolean>(false);
	const [timerDuration, setTimerDuration] = useState<number>(
		DEFAULT_TIMER_DURATION
	); // Default 60 seconds
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIMER_DURATION);

	useEffect(() => {
		const getWorkout = async () => {
			if (workout) {
				await setActiveWorkout(JSON.parse(workout as string) as IWorkout);
				// adding the sets to the state
				for (const exercise of activeWorkout?.workoutExercises || []) {
					await setSets(prevSets => {
						return {
							...prevSets,
							[exercise.exercise.id]: [],
						};
					});
				}
			}
		};
		getWorkout();
	}, [workout]);

	// This useEffect hook manages the countdown timer for the workout rest period.
	// It sets up an interval that decrements the time left every second while the timer is running.
	// If the time left reaches zero, it stops the timer.
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(prevTime => {
					// Check if the previous time is less than or equal to 1 second
					if (prevTime <= 1) {
						setIsRunning(false); // Stop the timer
						setTimeLeft(timerDuration);
						Vibration.vibrate(VIBRATION_PATTERN); // Vibrate for 2 seconds, pause, then vibrate again
						return 0; // Set time left to zero
					}
					return prevTime - 1; // Decrement the time left by 1 second
				});
			}, 1000);
		}
		// Cleanup function to clear the interval when the component unmounts or dependencies change
		return () => clearInterval(interval);
	}, [isRunning, timeLeft]);

	// Function to add a new set for a specific exercise
	const addSet = (exerciseId: number) => {
		setSets(prevSets => {
			const newSet: IExerciseSet = { weight: 0, reps: 0 }; // Initialize with default values
			return {
				...prevSets,
				[exerciseId]: prevSets[exerciseId]
					? [...prevSets[exerciseId], newSet]
					: [newSet],
			};
		});
	};

	// Function to update an existing set for a specific exercise
	const updateSet = (
		id: number,
		index: number,
		weight: number,
		reps: number
	) => {
		setSets(prevSets => {
			const updatedSets = [...prevSets[id]];
			updatedSets[index] = { weight, reps };
			return {
				...prevSets,
				[id]: updatedSets,
			};
		});
		// start the rest timer
		setIsRunning(true);
		setTimeLeft(timerDuration);
	};

	// Function to delete a specific set for an exercise
	const deleteSet = (id: number, index: number) => {
		setSets(prevSets => {
			const updatedSets = [...prevSets[id]];
			updatedSets.splice(index, 1);
			return {
				...prevSets,
				[id]: updatedSets,
			};
		});
	};

	// Function to end the workout
	const endWorkout = () => {
		router.push({
			pathname: "/workouts/active/end",
			params: { workout: workout, sets: JSON.stringify(sets) },
		});
	};

	if (!activeWorkout) {
		return <Loading />;
	}

	return (
		<LinearGradientWrapper>
			{/* Workout header */}
			<View className="flex-row justify-between items-center mb-4">
				<BoldText className="text-2xl text-white">
					{activeWorkout.name}
				</BoldText>
				<TouchableOpacity
					onPress={() => setIsTimerModalVisible(true)}
					className="flex-row items-center bg-light-gray p-1 rounded-lg"
				>
					{isRunning && (
						<RegularText className="mr-2 text-secondary-purple">
							{showTimer(timeLeft)}
						</RegularText>
					)}
					<AntDesign name="clockcircleo" size={16} color="#7B1FA2" />
				</TouchableOpacity>
			</View>
			{activeWorkout.workoutExercises.map((element, index) => (
				<ActiveWorkoutExercise
					key={index}
					workoutExercise={element}
					sets={sets[element.exercise.id] || []}
					stopTimer={() => {
						setIsRunning(false);
						setTimeLeft(timerDuration);
					}}
					onAddSet={addSet}
					onUpdateSet={updateSet}
					onDeleteSet={deleteSet}
				/>
			))}
			<SecondaryButton title="End Workout" onPress={endWorkout} />

			<RestTimerModal
				isTimerModalVisible={isTimerModalVisible}
				timerDuration={timerDuration}
				setIsTimerModalVisible={setIsTimerModalVisible}
				setTimerDuration={setTimerDuration}
				isRunning={isRunning}
				setIsRunning={setIsRunning}
				setTimeLeft={setTimeLeft}
			/>
		</LinearGradientWrapper>
	);
};

// RestTimerModal component to manage the rest timer functionality
const RestTimerModal = ({
	isTimerModalVisible,
	timerDuration,
	isRunning,
	setIsTimerModalVisible,
	setTimerDuration,
	setIsRunning,
	setTimeLeft,
}: {
	isTimerModalVisible: boolean;
	timerDuration: number;
	isRunning: boolean;
	setIsTimerModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setTimerDuration: React.Dispatch<React.SetStateAction<number>>;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
	setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [timePaused, setTimePaused] = useState<number>(-1);
	// Function to start the timer
	const startTimer = () => {
		setIsRunning(true);
	};

	// Function to stop the timer and reset time left
	const stopTimer = () => {
		setIsRunning(false);
		setTimeLeft(0);
	};

	// Function to pause the timer
	const pauseTimer = () => {
		setIsRunning(false);
	};

	// Function to update the timer duration by a specified change value
	const updateTimer = (change: number) => {
		// Check if the new timer duration exceeds the maximum limit of 600 seconds or is less than or equal to 0
		if (
			timerDuration + change > 600 ||
			timerDuration + change <= 0 ||
			isRunning
		) {
			return; // If so, exit the function without making changes
		}
		// Update the timer duration by adding the change value to the previous duration
		setTimerDuration(prev => prev + change);
	};

	return (
		<MyModal
			isVisible={isTimerModalVisible}
			onClose={() => setIsTimerModalVisible(false)}
			title="Rest Timer"
		>
			<View>
				{/* Controls for adjusting timer duration */}
				<View className="flex-row justify-between items-center">
					<Button
						title="<"
						onPress={() => updateTimer(-TIMER_CHANGE_INTERVAL)}
						disabled={isRunning}
					/>
					<BoldText>{timerDuration}</BoldText>
					<Button
						title=">"
						onPress={() => updateTimer(TIMER_CHANGE_INTERVAL)}
						disabled={isRunning}
					/>
				</View>
				{isRunning ? (
					<Button title="Pause" onPress={pauseTimer} />
				) : (
					<Button title="Start" onPress={startTimer} />
				)}

				<Button title="Stop" onPress={stopTimer} />
			</View>
		</MyModal>
	);
};

export default ActiveWorkoutScreen;
