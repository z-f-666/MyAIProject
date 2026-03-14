/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* 保留你原来的颜色 */
        primary: '#3b82f6',
        secondary: '#64748b',
        /* 👇 加上咱们的动态魔法颜色 */
        'theme-bg': 'var(--dynamic-bg)',
        'theme-text': 'var(--dynamic-text)',
        'theme-primary': 'var(--dynamic-primary)',
      },
    },
  },
  plugins: [],
}
