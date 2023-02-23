/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			xl: { max: "1536px" },
			lg: { max: "1200px" },
			md: { max: "992px" },
			sm: { max: "639px" },
		},
	},
	plugins: [],
};
