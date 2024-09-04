import { IExercise } from "../types";
import secureStorage from "../utils/secureStorage";
import fetchApi from "./fetchApi";

const API_URL = "http://192.168.1.14:8080/api/exercises";

/**
 * Returns the exercise with the given id
 * @param id - The id of the exercise.
 * @returns {Promise<IExercise>} - The exercise
 */
const getById = async (id: number): Promise<IExercise> =>
	await fetchApi(`${API_URL}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Returns all exercises
 * @returns {Promise<IExercise[]>} - An array of exercises
 */
const getAll = async (): Promise<IExercise[]> =>
	await fetchApi(API_URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	getById,
	getAll,
};
