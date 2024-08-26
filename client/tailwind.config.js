/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-pink": "#FF4081",
				"secondary-purple": "#7B1FA2",
				"dark-black": "#121212",
				"light-gray": "#F5F5F5",
				"light-purple": "#E1BEE7",
				"light-pink": "#FF8A80",
				"dark-purple": "#303F9F",
			},
		},
	},
	plugins: [],
};
