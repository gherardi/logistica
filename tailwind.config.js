/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				active: colors.neutral['300'],
				hover: colors.neutral['500'],
				invalid: colors.red['400'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
