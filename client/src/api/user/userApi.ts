import { IUser } from "../../types";
import secureStorage from "../../utils/secureStorage";
import fetchApi from "../fetchApi";

const API_URL = "http://192.168.1.14:8080/api/users";

/**
 * Gets the currently logged in user
 * @returns {Promise<IUser>} - The current user
 */
const getCurrent = async (): Promise<IUser> =>
	await fetchApi(`${API_URL}/current`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

/**
 * Updates the profile picture of the currently logged in user
 * @param {FormData} formData - The form data containing the new profile picture
 * @returns {Promise<IUser>} - The updated user
 */
const updateProfilePicture = async (formData: FormData): Promise<IUser> =>
	await fetchApi(`${API_URL}/current/image`, {
		method: "PATCH",
		body: formData,
		headers: {
			Authorization: `Bearer ${await secureStorage.getToken()}`,
			"Content-Type": "multipart/form-data",
		},
	});

/**
 * Updates the username and email of the currently logged in user
 * @param {string} username - The new username
 * @param {string} email - The new email
 * @returns {Promise<IUser>} - The updated user
 */
const updateUser = async (username: string, email: string): Promise<IUser> =>
	await fetchApi(`${API_URL}/current`, {
		method: "PUT",
		body: JSON.stringify({ username, email }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await secureStorage.getToken()}`,
		},
	});

export default {
	getCurrent,
	updateProfilePicture,
	updateUser,
};
