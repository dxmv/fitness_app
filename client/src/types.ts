export interface ITextInput {
	value: string;
	errorMessage: string;
}

export type IUserRole = "ADMIN" | "USER";

export interface IUser {
	id: number;
	email: string;
	username: string;
	password: string;
	profilePicture: string;
	workouts: Array<IWorkout>;
	routines: Array<IWorkout>;
	roles: Set<IUserRole>;
}

export interface IWorkout {}

export interface IRoutine {}
