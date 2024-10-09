/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors:{
        background: "#FAFAFA",
        black: "#000000",
        blueDark: "#2491D2",
        blueLight: "#00C1FF",
        gray: "#D0CECE",
        grayLight: "#F7F7F7",
        lime: "#BCEC30",
        limeHover: "#C6FF00",
        orange: "#F7A012",
        purple: "#7D458C",
        red: "#DB0030",
        salmon: "#FF7E65",
        selectionBorder: "#C4C4C4",
        white: "#FFFFFF",
        yellow: "#FFC700",
      },
      fontFamily: {
        'roboto-400': 'var(--font-roboto-400)',
        'roboto-500': 'var(--font-roboto-500)',
      },
    },
  },
  plugins: [],
};
