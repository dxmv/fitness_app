import { IRoutineWorkout } from "../../types";
import secureStorage from "../../utils/secureStorage";
import fetchApi from "../fetchApi";

const API_URL = "http://192.168.1.14:8080/api/routines";

/**
 * Adds a workout to a routine
 * @param {number} routineId - The ID of the routine to add the workout to
 * @param {number} routineWorkoutId - The ID of the routine workout to add to
 * @param {number} workoutId - The ID of the workout to be added
 * @returns {Promise<IRoutineWorkout>} - The created RoutineWorkout
 */
const addWorkoutToRoutine = async (
	routineId: number,
	routineWorkoutId: number,
	workoutId: number
): Promise<IRoutineWorkout> =>
	await fetchApi(
		`${API_URL}/${routineId}/workouts/${routineWorkoutId}/${workoutId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${await secureStorage.getToken()}`,
			},
		}
	);

/**
 * Removes a workout from a routine
 * @param {number} routineId - The ID of the routine to remove the workout from
 * @param {number} routineWorkoutId - The ID of the Routine workout to remove
 * @returns {Promise<IRoutineWorkout>} - The removed RoutineWorkout
 */
const removeWorkoutFromRoutine = async (
	routineId: number,
	routineWorkoutId: number
): Promise<IRoutineWorkout> =>
	await fetchApi(`${API_URL}/${routineId}/workouts/${routineWorkoutId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	addWorkoutToRoutine,
	removeWorkoutFromRoutine,
};
