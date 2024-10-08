import { IErrorResponse } from "../types";

/**
 * A reusable fetch function for making API calls.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} options - The options for the fetch call.
 * @returns {Promise<any>} - The parsed JSON response.
 * @throws {IErrorResponse} - If the response is not ok.
 */
const fetchApi = async (
	url: string,
	options: RequestInit = {}
): Promise<any> => {
	const response = await fetch(url, {
		...options,
		headers: {
			...options.headers,
		},
	});

	// handle errors
	if (!response.ok) {
		const errorData: IErrorResponse = await response.json();
		throw errorData;
	}

	return response.json();
};

export default fetchApi;
