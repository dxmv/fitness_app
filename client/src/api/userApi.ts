import { IUser } from "../types";
import secureStorage from "../utils/secureStorage";
import fetchApi from "./fetchApi";

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

export default {
	getCurrent,
};
