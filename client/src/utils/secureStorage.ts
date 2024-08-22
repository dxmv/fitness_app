import * as SecureStore from "expo-secure-store";

/**
 * Stores the token as string in Secure store
 * @param {{username:string,password:string}} loginData - The token to store
 */
const storeToken = async (token: string) => {
	try {
		await SecureStore.setItemAsync("userToken", token);
	} catch (e) {
		console.error("Failed to save the token to SecureStore", e);
	}
};

/**
 * Get the user's jwt token
 * @returns {string} token - The jwt token for user
 */
const getToken = async () => {
	try {
		return await SecureStore.getItemAsync("userToken");
	} catch (e) {
		console.error("Failed to get the token from SecureStore", e);
	}
};

/**
 * Removes the user's jwt token
 */
const removeToken = async () => {
	try {
		await SecureStore.deleteItemAsync("userToken");
	} catch (e) {
		console.error("Failed to remove the token from SecureStore", e);
	}
};

export default { storeToken, getToken, removeToken };
