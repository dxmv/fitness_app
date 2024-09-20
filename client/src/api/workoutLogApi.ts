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

export default {
	completeWorkout,
};
