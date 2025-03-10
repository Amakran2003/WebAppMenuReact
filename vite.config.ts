import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/WebAppMenuReact/', // Repository name with slashes
  plugins: [react()],
  server: {
    // Improve mobile testing capabilities
    host: true,
    open: true,
  },
  build: {
    // Ensure source maps are generated for easier debugging
    sourcemap: true,
  },
})