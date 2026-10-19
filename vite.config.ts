import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: { port: 5181 },
  resolve: {
    alias: {
      // Dev against package source — no build step needed while developing.
      // Production consumers use the built dist/ via the package exports.
      '@sakhaui/ui': fileURLToPath(new URL('./packages/ui/src/index.ts', import.meta.url)),
    },
  },
})
