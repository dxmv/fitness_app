import { ITextInput } from "../types";
// Functions to handle the input and update of the data in auth forms

export const handleUsernameChange = (
	text: string,
	setEmail: React.Dispatch<React.SetStateAction<ITextInput>>
) => {
	// checks if the username is valid
	const validUsername = (value: string): boolean => {
		return value.length >= 4;
	};

	setEmail({
		value: text,
		errorMessage:
			!validUsername(text) && text != ""
				? "The username should be at least 4 characters long"
				: "",
	});
};

export const handleEmailChange = (
	text: string,
	setEmail: React.Dispatch<React.SetStateAction<ITextInput>>
) => {
	// checks if the emails match the regex
	const validEmail = (value: string): boolean => {
		const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // letters before '@', letters after '@', after those letters a '.' and then more letters
		return emailRegex.test(value);
	};

	setEmail({
		value: text,
		errorMessage:
			!validEmail(text) && text != ""
				? "The email isn't in correct format"
				: "",
	});
};

export const handlePasswordChange = (
	text: string,
	setPassword: React.Dispatch<React.SetStateAction<ITextInput>>
) => {
	// checks if the password has at least one uppercase letter and one number
	const validPassword = (value: string): boolean => {
		const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;
		return passwordRegex.test(value);
	};

	setPassword({
		value: text,
		errorMessage:
			!validPassword(text) && text != ""
				? "The password must contain at least one uppercase letter and one number"
				: "",
	});
};
