/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1320px',
        '2xl': '1536px',
      },
      maxWidth: {
        'wrap-size': '1440px',
      },
      colors: {
        'layout-blue': '#6172F3',
        'link-blue': '#8098F9',
        'text-black': '#09090B',
        'string-white': '#E0EAFF',
        'string-grey': '#71717A',
        'bg-white': '#F5F8FF',
        'input-blue': '#2D31A633',
        'input-light-blue': '#8098F980',
        'input-light-blue-2': '#8098F91A',
      },
      fontSize: {
        'form-title': '2.5rem',
      },
      backgroundImage: {
        'checkbox': 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC\'), linear-gradient(135deg, #B1B6BE 0%, #FFF 100%)',
      },
    },
  },
  plugins: [],
}

