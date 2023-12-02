/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'mo/src/**/*.{js,ts, html}',
		'demo/src/**/*.{js,ts, html}',
		'hummingbird/src/**/*.{js,ts, html}',
	],
	theme: {
		container: {
			center: true,
		},
	},
	plugins: [require('daisyui'), require('@tailwindcss/container-queries')],
	daisyui: {
		themes: ['light'],
	},
}
