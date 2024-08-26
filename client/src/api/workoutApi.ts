import { IExercise, IWorkout } from "../types";
import secureStorage from "../utils/secureStorage";
import fetchApi from "./fetchApi";

const API_URL = "http://192.168.1.14:8080/api/workouts";

/**
 * Returns the workout with the given id
 * @param id - The id of the workout.
 * @returns {Promise<IWorkout>} - The workout
 */
const getById = async (id: number): Promise<IWorkout> =>
	await fetchApi(`${API_URL}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	getById,
};
