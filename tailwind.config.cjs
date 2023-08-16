const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		textColor: {
			light: '#15171f',
			dark: '#dfe0e2',
			green: '#86EFAC',
			'accent-100': '#d4163c',
			'accent-200': '#401a2a',
			'accent-300': '#2c2931'
		},

		backgroundColor: {
			light: '#dfe0e2',
			dark: '#14161d',

			'green-100': '#86EFAC',
			'green-200': '#4ADE80',
			red: '#F87171',
			yellow: ' #FDE047',
			blue: '#60A5FA',
			backdrop: '#000000a1',

			'primary-100': '#27293a',
			'primary-200': '#202330',
			'primary-300': '#1a1c26',
			'primary-400': '#14161d',

			'secondary-100': '#d4163c',
			'secondary-200': '#401a2a',
			'secondary-300': '#2c2931'
		},

		borderColor: {
			'primary-100': '#27293a',
			'primary-200': '#202330',
			'primary-300': '#1a1c26',
			'primary-400': '#14161d',

			'secondary-100': '#2c2931',
			'secondary-200': '#d4163c',
			'secondary-300': '#401a2a'
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;
