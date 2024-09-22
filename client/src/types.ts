export interface ITextInput {
	value: string;
	errorMessage: string;
}

export type DayOfWeek =
	| "MONDAY"
	| "TUESDAY"
	| "WEDNESDAY"
	| "THURSDAY"
	| "FRIDAY"
	| "SATURDAY"
	| "SUNDAY";
export type IUserRole = "ADMIN" | "USER";
export enum MuscleGroup {
	CHEST = "CHEST",
	BACK = "BACK",
	LEGS = "LEGS",
	SHOULDERS = "SHOULDERS",
	BICEPS = "BICEPS",
	TRICEPS = "TRICEPS",
	ABS = "ABS",
	CALVES = "CALVES",
	FOREARMS = "FOREARMS",
	TRAPS = "TRAPS",
	GLUTES = "GLUTES",
	HAMSTRINGS = "HAMSTRINGS",
	QUADRICEPS = "QUADRICEPS",
}

export interface IUser {
	id: number;
	email: string;
	username: string;
	password: string;
	profilePicture: string;
	workouts: Array<IWorkout>;
	routines: Array<IRoutine>;
	roles: Set<IUserRole>;
}

export interface IWorkout {
	id: number;
	name: string;
	workoutExercises: Array<IWorkoutExercise>;
}

export interface IWorkoutExercise {
	id: number;
	exercise: IExercise;
	workout: IWorkout;
	sets: Array<IExerciseSet>;
}

export interface IExercise {
	id: number;
	name: string;
	description: string;
	gifUrl: string;
	videoUrls: Array<string>;
	muscleGroups: Array<MuscleGroup>;
}

export interface IExerciseSet {
	reps: number;
	weight: number;
}

export interface IRoutine {
	id: number;
	name: string;
	weeklySchedule: Array<IRoutineWorkout>;
}

export interface IRoutineWorkout {
	id: number;
	workout: IWorkout | null;
	dayOfWeek: DayOfWeek;
}

export interface ICompletedWorkout {
	id: number;
	workout: IWorkout;
	completedExercises: Array<ICompletedExercise>;
	completedAt: string;
}

export interface ICompletedExercise {
	exercise: IExercise;
	exerciseSetLogs: Array<IExerciseSet>;
	orderInWorkout: number;
}

export interface IErrorResponse {
	statusCode: number;
	message: string;
	description: string;
}
