/** @type {import('tailwindcss').Config} */

const generateSpacing = (max) => {
  const spacing = {};

  for (let i = 1; i <= max; i++) spacing[i] = `${i}px`;
  return spacing;
};

module.exports = {
  content: ['./index.html', "./src/**/*.{tsx,ts}"],
  theme: {
    spacing: generateSpacing(1300),

    borderRadius: {
      sm: '8px',
      lg: '48px',
    },

    screens: {
      mobile: '320px',
      tablet: '640px',
      'tablet-large': '768px',
      desktop: '1200px',

    },
    extend: {
      colors:{
        black: '#000000',
        bg: '#441752',
        card: '#8174A0',
        primary: '#A888B5',
        secondary: '#EFB6C8',
      },
      fontFamily: {
        'sans': ['Roboto'],
      },

      fontSize: {
        sm: [
          '12px',
          {
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        md: [
          '14px',
          {
            lineHeight: '15px',
            letterSpacing: '0',
            fontWeight: '500',
          },
        ],
        lg: [
          '18px',
          {
            letterSpacing: '0',
            fontWeight: '700',
          },
        ],
        xlg: [
          '24px',
          {
            letterSpacing: '0',
            fontWeight: '800',
          },
        ],
    },
  },
  plugins: [],
  },
}
