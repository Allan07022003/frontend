module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      screens: { 
        'xs-320': '320px',
        'xs-350': '350px',
        'xs-390': '390px',
        'xs-430': '430px',
      },
    },
  },
  plugins: [require('daisyui')],
};
