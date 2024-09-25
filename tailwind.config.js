/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto-400': 'var(--font-roboto-400)',
        'roboto-500': 'var(--font-roboto-500)',
      },
    },
  },
  plugins: [],
}
