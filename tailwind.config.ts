import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: '12px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '22px',
      '3xl': '24px',
      '4xl': '26px',
      '5xl': '28px'
    },
    extend: {
      colors: ({ colors }) => ({
        background: {
          DEFAULT: '#0C0D10'
        },
        violet: {
          ...colors.violet,
          500: '#CDAAFF'
        }
      }),
      fontFamily: {
        body: ['var(--font-body)'],
        branding: ['var(--font-branding)']
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(to right, #FABBFF 0%, #B179FF 50%, #6DDDFF 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
