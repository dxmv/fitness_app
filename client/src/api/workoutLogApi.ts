import { ICompletedWorkout } from "../types";
import secureStorage from "../utils/secureStorage";
import fetchApi from "./fetchApi";

const API_URL = "http://192.168.1.14:8080/api/workout_log";

/**
 * Saves the workout log to the database
 * @param {{workoutId:number, exercises:Array<{exerciseId:number, orderInWorkout:number, sets:Array<{weight:number, reps:number}>}>}} workoutData - The workout data to be saved.
 * @returns {Promise<any>} - The response from the API.
 */
const completeWorkout = async (workoutData: {
	workoutId: number;
	exercises: Array<{
		exerciseId: number;
		orderInWorkout: number;
		sets: Array<{
			weight: number;
			reps: number;
		}>;
	}>;
}): Promise<any> =>
	await fetchApi(`${API_URL}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
		body: JSON.stringify(workoutData),
	});

/**
 * Get all completed workouts
 * @returns {Promise<ICompletedWorkout[]>} - An array of completed workouts.
 */
const getCompletedWorkouts = async (): Promise<ICompletedWorkout[]> =>
	await fetchApi(`${API_URL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Delete a workout log
 * @param {number} workoutId - The ID of the workout to delete.
 * @returns {Promise<any>} - The response from the API.
 */
const deleteWorkoutLog = async (workoutId: number): Promise<any> =>
	await fetchApi(`${API_URL}/${workoutId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	completeWorkout,
	getCompletedWorkouts,
	deleteWorkoutLog,
};
