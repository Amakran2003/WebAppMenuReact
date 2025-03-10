import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sb1-d5keejvn/', // Replace with your repository name (including leading and trailing slashes)
  plugins: [react()],
})