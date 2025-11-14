module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      keyframes: {
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0' }
        }
      },
      animation: {
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
