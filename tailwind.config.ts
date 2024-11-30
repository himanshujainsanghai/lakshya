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
      },
    },
  },
  plugins: [],
};
export default config;
