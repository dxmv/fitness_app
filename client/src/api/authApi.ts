import fetchApi from "./fetchApi";

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
		body: JSON.stringify(loginData),
	});

export default {
	login,
};
