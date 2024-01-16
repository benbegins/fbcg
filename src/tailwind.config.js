/** @type {import('tailwindcss').Config} */
export default {
	content: ["../templates/**/*.twig", "./components/**/*.js", "./js/**/*.js"],
	theme: {
		colors: {
			white: "#F9F9FA",
			gray: "#E2E5EA",
			black: "#10141F",
			blue: "#375474",
			orange: "#E35B2F",
			"orange-dark": "#C6441B",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1.25rem",
				lg: "3rem",
			},
		},
		fontFamily: {
			sans: ["Plus Jakarta Sans", "sans-serif"],
		},
		fontSize: {
			sm: "0.75rem",
			base: "0.9375rem",
			md: "1.125rem",
			lg: "1.25rem",
			xl: "1.375rem",
			"2xl": "1.625rem",
			"3xl": "2.5rem",
			"4xl": "4rem",
			"5xl": "5.5rem",
		},

		extend: {
			aspectRatio: {
				"5/3": "5 / 3",
			},
			borderRadius: {
				sm: "0.25rem",
			},
			padding: {
				header: "6rem",
				"section-mobile": "3.5rem",
				"section-desktop": "8rem",
			},
		},
	},
	plugins: [],
}
