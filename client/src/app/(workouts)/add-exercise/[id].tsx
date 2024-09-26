import { View, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import exerciseApi from "../../../api/exerciseApi";
import { IExercise, MuscleGroup } from "../../../types";
import Loading from "../../../components/Loading";
import BoldText from "../../../components/text/BoldText";
import RegularText from "../../../components/text/RegularText";
import { Feather } from "@expo/vector-icons";
import workoutApi from "../../../api/workoutApi";

const AddExercise = () => {
	const [groupedExercises, setGroupedExercises] = useState<Record<
		MuscleGroup,
		IExercise[]
	> | null>(null);
	const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
		null
	);
	const { id, exerciseIds } = useLocalSearchParams();
	const exerciseIdSet: Set<number> = new Set(JSON.parse(exerciseIds as string));

	useEffect(() => {
		const getExercises = async () => {
			try {
				const res = await exerciseApi.getAll();
				const grouped = res.reduce((acc, exercise) => {
					exercise.muscleGroups.forEach(group => {
						if (!acc[group]) {
							acc[group] = [];
						}
						acc[group].push(exercise);
					});
					return acc;
				}, {} as Record<MuscleGroup, IExercise[]>);
				setGroupedExercises(grouped);
			} catch (e) {
				console.log(e);
			}
		};
		getExercises();
	}, []);

	if (!groupedExercises) {
		return <Loading />;
	}

	const handleAddExercise = async () => {
		try {
			if (!selectedExerciseId) {
				return;
			}
			await workoutApi.addExerciseToWorkout(Number(id), selectedExerciseId);
			router.back();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View className="flex-1 bg-light-gray p-4">
			<View className="flex flex-row justify-between items-center">
				<BoldText className="text-3xl">Add An Exercise</BoldText>
				<TouchableOpacity onPress={() => router.back()}>
					<RegularText>Cancel</RegularText>
				</TouchableOpacity>
			</View>
			{Object.keys(groupedExercises).map(group => (
				<GroupedExercises
					key={group}
					group={group as MuscleGroup}
					exercises={groupedExercises[group as MuscleGroup]}
					selectedExerciseId={selectedExerciseId}
					setSelectedExerciseId={setSelectedExerciseId}
					exerciseIdSet={exerciseIdSet}
				/>
			))}
			{selectedExerciseId && (
				<TouchableOpacity
					className="absolute bottom-28 right-5 bg-secondary-purple text-white p-3 rounded-full"
					onPress={handleAddExercise}
				>
					<Feather name="check" size={32} color="white" />
				</TouchableOpacity>
			)}
		</View>
	);
};

const GroupedExercises = ({
	group,
	exercises,
	selectedExerciseId,
	setSelectedExerciseId,
	exerciseIdSet,
}: {
	group: MuscleGroup;
	exercises: IExercise[];
	selectedExerciseId: number | null;
	setSelectedExerciseId: React.Dispatch<React.SetStateAction<number | null>>;
	exerciseIdSet: Set<number>;
}) => {
	return (
		<View className="mb-4">
			<BoldText className="text-xl text-secondary-purple">{group}</BoldText>
			<FlatList
				data={exercises}
				renderItem={({ item }) => (
					<TouchableOpacity
						className={`flex flex-row items-center justify-between bg-white p-2 rounded-md ${
							selectedExerciseId === item.id ? "bg-light-pink" : ""
						} ${exerciseIdSet.has(item.id) ? "opacity-50" : ""}`}
						onPress={() => {
							if (exerciseIdSet.has(item.id)) {
								return;
							}
							setSelectedExerciseId(item.id);
						}}
					>
						<View className="flex flex-row items-center gap-2 justify-between w-full">
							<View className="flex flex-row items-center gap-2">
								<Image
									source={{
										uri: "https://m.media-amazon.com/images/I/61lpZ1gGxkL._AC_UF1000,1000_QL80_.jpg",
									}}
									width={32}
									height={32}
									className="rounded-md"
								/>
								<RegularText>{item.name}</RegularText>
							</View>
							<View>
								<RegularText>Info</RegularText>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default AddExercise;
