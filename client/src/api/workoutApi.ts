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

/**
 * Returns all workouts for the current user
 * @param id - The id of the workout.
 * @returns {Promise<IWorkout>} - The workout
 */
const getAll = async (): Promise<Array<IWorkout>> =>
	await fetchApi(`${API_URL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Creates a new workout
 * @param workoutName - The workout to create.
 * @returns {Promise<IWorkout>} - The created workout
 */
const createWorkout = async (workoutName: string): Promise<IWorkout> =>
	await fetchApi(`${API_URL}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
		body: JSON.stringify({ name: workoutName }),
	});

export default {
	getById,
	getAll,
	createWorkout,
};
