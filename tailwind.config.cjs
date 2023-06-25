const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
  
	theme: {
	  extend: {
		textColor: {
		  theme: {
			base: 'var(--text-base)',
			mid: 'var(--text-mid)',
			inverted: 'var(--text-inverted)'
		  },
		},
		backgroundColor: {
		  theme: {
			fill: 'var(--bg-base)',
			mid: 'var(--bg-mid)',
			inverted: 'var(--bg-inverted)'
		  }
		},
		borderColor: {
		  theme: {
			base: 'var(--border-base)',
			focus: 'var(--border-focus)'
		  }
		}
	  },
	},
  
	plugins: []
  };
  
  module.exports = config;