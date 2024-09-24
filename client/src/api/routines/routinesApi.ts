import { IRoutine, IUser } from "../../types";
import secureStorage from "../../utils/secureStorage";
import fetchApi from "../fetchApi";

const API_URL = "http://192.168.1.14:8080/api/routines";

/**
 * Returns all routines for the current user
 * @returns {Promise<Array<IRoutine>>} - The routines
 */
const getAllRoutines = async (): Promise<Array<IRoutine>> =>
	await fetchApi(`${API_URL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Creates a new routine for the current user
 * @param {string} name - The name of the new routine
 * @returns {Promise<IRoutine>} - The new routine
 */
const createRoutine = async (name: string): Promise<IRoutine> =>
	await fetchApi(`${API_URL}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
		body: JSON.stringify({ name }),
	});

/**
 * Returns a routine by its ID
 * @param {string} id - The ID of the routine to get
 * @returns {Promise<IRoutine>} - The routine
 */
const getRoutineById = async (id: string): Promise<IRoutine> =>
	await fetchApi(`${API_URL}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Deletes a routine by its ID
 * @param {string} id - The ID of the routine to delete
 * @returns {Promise<void>} - The routine
 */
const deleteRoutine = async (id: number): Promise<void> =>
	await fetchApi(`${API_URL}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Make routine active by its ID
 * @param {string} id - The ID of the routine to make active
 * @returns {Promise<IUser>} - The user
 */

const activateRoutine = async (id: number): Promise<IUser> =>
	await fetchApi(`${API_URL}/activate/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	getAllRoutines,
	createRoutine,
	getRoutineById,
	deleteRoutine,
	activateRoutine,
};
