import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Utiliser un chemin relatif pour un déploiement flexible
  plugins: [react()],
  server: {
    // Improve mobile testing capabilities
    host: true,
    open: true,
  },
  build: {
    // Ensure source maps are generated for easier debugging
    sourcemap: true,
    // Ajouter le fichier 404.html pour GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
})