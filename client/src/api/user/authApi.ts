import fetchApi from "../fetchApi";

const API_URL = "http://192.168.1.14:8080/api/auth";

/**
 * Logs in a user with the provided email and password.
 * @param {{username:string,password:string}} loginData - The login data.
 * @returns {Promise<{token:string}>} - The login response.
 */
const login = async (loginData: {
	username: string;
	password: string;
}): Promise<{ jwt: string }> =>
	await fetchApi(`${API_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginData),
	});

/**
 * Registers a new user with the provided data.
 * @param {FormData} formData - The form data including username, email, password, and optionally an image.
 * @returns {Promise<any>} - The registration response.
 */
export const register = async (formData: FormData): Promise<any> => {
	return await fetchApi(`${API_URL}/register`, {
		method: "POST",
		body: formData,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export default {
	login,
	register,
};
