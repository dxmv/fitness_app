import { View, Text, Button } from "react-native";
import { IRoutineWorkout } from "../types";
import BoldText from "./text/BoldText";
import React from "react";
import { Feather } from "@expo/vector-icons";

const WeeklyScheduleRoutine = ({
	weeklySchedule,
}: {
	weeklySchedule: IRoutineWorkout[];
}) => {
	return (
		<View>
			<View className="flex-row bg-white  rounded-lg py-2 w-full ">
				{weeklySchedule.map((routineWorkout, index) => (
					<View
						key={routineWorkout.id}
						className={` flex-1 flex-col justify-center items-center p-1 w-1/7 ${
							index !== weeklySchedule.length - 1
								? "border-r-2 border-light-gray"
								: ""
						}`}
					>
						<BoldText className="mb-2">
							{routineWorkout.dayOfWeek.slice(0, 3)}
						</BoldText>
						{routineWorkout.workout ? (
							<Feather name="check-circle" size={20} color="green" />
						) : (
							<Feather name="x-circle" size={20} color="red" />
						)}
					</View>
				))}
			</View>
		</View>
	);
};

export default WeeklyScheduleRoutine;
