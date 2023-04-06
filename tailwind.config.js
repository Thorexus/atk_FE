/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        thin: ['sukhumvit_thin', 'sans-serif'],
        light: ['sukhumvit_light', 'sans-serif'],
        sukhumvit: ['sukhumvit_text', 'sans-serif'],
        medium: ['sukhumvit_medium', 'sans-serif'],
        semibold: ['sukhumvit_semibold', 'sans-serif'],
        bold: ['sukhumvit_bold', 'sans-serif'],
      },
      fontSize: {
        '2xs': [
          '10px',
          {
            lineHeight: '16px',
          },
        ],
        xs: [
          '12px',
          {
            lineHeight: '19px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '22px',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '25px',
          },
        ],
        lg: [
          '18px',
          {
            lineHeight: '29px',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '32px',
          },
        ],
      },

      /* Color styles */
      // -

      colors: {
        neutral: {
          50: '#F9FAFB;',
          100: '#F3F5F8',
          200: '#E7EBF1',
          300: '#DAE1E9',
          400: '#CED7E2',
          500: '#C2CDDB',
          600: '#9BA4AF',
          700: '#747B83',
          800: '#4E5258',
          900: '#27292C',
        },
        primary: {
          50: '#EAF2FE',
          100: '#D5E5FD',
          200: '#ACCCFB',
          300: '#82B2F8',
          400: '#5999F6',
          500: '#2F7FF4',
          600: '#2666C3',
          700: '#1C4C92',
          800: '#133362',
          900: '#091931',
        },
        success: {
          50: '#F0FDF3',
          100: ' #DCFCE5',
          200: ' #BBF7CC',
          300: ' #86EFA5',
          400: ' #4ADE76',
          500: ' #22C553',
          600: ' #159E3E',
          700: ' #158036',
          800: ' #16652F',
          900: ' #145329',
        },
        error: {
          50: '#FCEBEB',
          100: '#F8D6D6',
          200: '#F1AEAE',
          300: '#EA8585',
          400: '#E35D5D',
          500: '#DC3434',
          600: '#B02A2A',
          700: '#841F1F',
          800: '#581515',
          900: '#2C0A0A',
        },
        warning: {
          50: '#FEF9EE',
          100: '#FDF2D7',
          200: '#FAE0AE',
          300: '#F6C97B',
          400: '#F2A845',
          500: '#EF952E',
          600: '#DF7417',
          700: '#B95915',
          800: '#934619',
          900: '#773C17',
        },
      },
      screens: {
        '2xl': '1920px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};