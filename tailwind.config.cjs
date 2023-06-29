const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
  
	theme: {
	  extend: {
		textColor: {
		  theme: {
			base: 'var(--color-font-base)',
			dark: 'var(--color-font-dark)',
			decorated: 'var(--color-primary)',
			strongdecorated: 'var(--color-primary-strong)',
		  },
		},
		backgroundColor: {
		  theme: {
			strong: 'var(--color-secondary-strong)',
			base: 'var(--color-secondary)',
			soft: 'var(--color-secondary-soft)',
			softer: 'var(--color-secondary-softer)',
			decorated: 'var(--color-primary)',
			strongdecorated: 'var(--color-primary-strong)',
			softdecorated: 'var(--color-primary-soft)',
		  }
		},
		borderColor: {
		  theme: {
			base: 'var(--color-secondary-soft)',
			focus: 'var(--color-font-dark)',
			decorated: 'var(--color-primary)',
			soft: 'var(--color-secondary-softer)'
		  }
		}
	  },
	},
  
	plugins: []
  };
  
  module.exports = config;