import { Button, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import BoldText from "../../../components/text/BoldText";
import LightText from "../../../components/text/LightText";
import { IExerciseSet, IWorkout } from "../../../types";
import RegularText from "../../../components/text/RegularText";
import ActiveWorkoutExercise from "../_components/ActiveWorkoutExercise";
import MyModal from "../../../components/MyModal";

const TIMER_CHANGE_INTERVAL = 10;
const DEFAULT_TIMER_DURATION = 60;

const ActiveWorkoutScreen = () => {
	const router = useRouter();

	const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null);
	const [sets, setSets] = useState<{ [key: string]: Array<IExerciseSet> }>({});
	const { workout } = useLocalSearchParams();
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
							[exercise.exercise.name]: [],
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
	const addSet = (exerciseName: string) => {
		setSets(prevSets => {
			const newSet: IExerciseSet = { weight: 0, repCount: 0 }; // Initialize with default values
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
		repCount: number
	) => {
		setSets(prevSets => {
			const updatedSets = [...prevSets[exerciseName]];
			updatedSets[index] = { weight, repCount };
			return {
				...prevSets,
				[exerciseName]: updatedSets,
			};
		});
		// start the rest timer
		setIsRunning(true);
		setTimeLeft(timerDuration);
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

	// Function to end the workout
	const endWorkout = () => {
		router.push({
			pathname: "/active/end",
			params: { workout: JSON.stringify(workout), sets: JSON.stringify(sets) },
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
					{activeWorkout.name} - {isRunning && timeLeft}
				</BoldText>
				<RegularText onPress={() => setIsTimerModalVisible(true)}>
					Rest timer
				</RegularText>
			</View>
			{activeWorkout.workoutExercises.map((element, index) => (
				<ActiveWorkoutExercise
					key={index}
					workoutExercise={element}
					sets={sets[element.exercise.name] || []}
					stopTimer={() => {
						setIsRunning(false);
						setTimeLeft(timerDuration);
					}}
					onAddSet={addSet}
					onUpdateSet={updateSet}
					onDeleteSet={deleteSet}
				/>
			))}
			<Button title="End" onPress={endWorkout} />

			<RestTimerModal
				isTimerModalVisible={isTimerModalVisible}
				timerDuration={timerDuration}
				setIsTimerModalVisible={setIsTimerModalVisible}
				setTimerDuration={setTimerDuration}
				isRunning={isRunning}
				setIsRunning={setIsRunning}
				setTimeLeft={setTimeLeft}
			/>
		</View>
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
						onPress={() =>
							setTimerDuration(prev => prev - TIMER_CHANGE_INTERVAL)
						}
					/>
					<BoldText>{timerDuration}</BoldText>
					<Button
						title=">"
						onPress={() =>
							setTimerDuration(prev => prev + TIMER_CHANGE_INTERVAL)
						}
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
