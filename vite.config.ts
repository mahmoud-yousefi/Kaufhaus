import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Kaufhaus/',
  plugins: [react()],
  build: {
    sourcemap: false,
  },
})
