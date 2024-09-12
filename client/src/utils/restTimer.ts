// Function to convert time left in seconds to minutes and seconds
// Returns an array where the first element is the minutes and the second is the seconds
export const showTimer = (timeLeft: number): string => {
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	return `${minutes < 10 ? "0" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`; // Use Math.floor to get whole minutes
};
