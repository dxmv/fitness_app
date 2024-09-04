import { View, FlatList, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import BoldText from "../../components/text/BoldText";
import CustomTextInput from "../../components/CustomTextInput";
import { ITextInput, IExercise } from "../../types";
import exerciseApi from "../../api/exerciseApi";

const AddWorkoutExercise = () => {
	// State to manage the reps input
	const [reps, setReps] = useState<ITextInput>({
		value: "",
		errorMessage: "",
	});

	// State to store the list of exercises fetched from the API
	const [exercises, setExercises] = useState<IExercise[]>([]);

	// State to keep track of the selected exercise
	const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
		null
	);

	// Effect to fetch exercises when the component mounts
	useEffect(() => {
		const fetchExercises = async () => {
			try {
				// Fetch all exercises from the API
				const fetchedExercises = await exerciseApi.getAll(); // Assuming you have a method to get all exercises
				console.log(fetchedExercises);
				setExercises(fetchedExercises); // Update state with fetched exercises
			} catch (error) {
				console.error("Failed to fetch exercises", error); // Log any errors
			}
		};

		fetchExercises(); // Call the fetch function
	}, []);

	const handleAddExercise = () => {
		console.log(selectedExercise);
	};

	// Function to render each exercise item in the list
	const renderExerciseItem = ({ item }: { item: IExercise }) => (
		<TouchableOpacity onPress={() => setSelectedExercise(item)}>
			{/* Display the exercise name */}
			<BoldText>{item.name}</BoldText>
		</TouchableOpacity>
	);

	return (
		<View>
			<BoldText>Add Workout Exercise</BoldText>
			<CustomTextInput
				value={reps.value}
				errorText={reps.errorMessage}
				label="Reps:"
				onChangeText={text => setReps({ value: text, errorMessage: "" })} // Update reps state on text change
			/>
			<BoldText>Select Exercise:</BoldText>
			<FlatList
				data={exercises}
				renderItem={renderExerciseItem}
				keyExtractor={item => item.id.toString()}
			/>
			<BoldText>Selected Exercise: {selectedExercise?.name}</BoldText>
			<Button title="Add Exercise" onPress={handleAddExercise} />
		</View>
	);
};

export default AddWorkoutExercise;
