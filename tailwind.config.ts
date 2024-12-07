import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        myblue: "#C3EBFA",
        mybluelight: "#EDF9FD",
        mypurple: "#CFCEFF",
        mypurplelight: "#F1F0FF",
        myYellow: "#FAE27C",
        myYellowlight: "#FEFCE8",
        mybg1: "rgb(249 231 159 / 71%)",
        mybg2: "#f7f8f8",
        mybg3: "#540394",
        mybg4: "#300156",
      },
    },
  },
  plugins: [],
};
export default config;
